-- Eureka Products MF Database Schema
-- This script sets up the database schema for the Eureka microfrontend

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create custom types
CREATE TYPE user_ai_preference AS ENUM ('ai', 'traditional', 'hybrid');
CREATE TYPE product_status AS ENUM ('active', 'inactive', 'coming_soon');
CREATE TYPE service_type AS ENUM ('consultation', 'implementation', 'support', 'training');
CREATE TYPE service_status AS ENUM ('active', 'inactive', 'waitlist');
CREATE TYPE pricing_model AS ENUM ('fixed', 'hourly', 'monthly', 'custom');
CREATE TYPE expertise_level AS ENUM ('basic', 'intermediate', 'advanced', 'expert');
CREATE TYPE interaction_type AS ENUM ('chat', 'search', 'view', 'purchase', 'rating');
CREATE TYPE content_type AS ENUM ('product', 'service', 'knowledge');

-- =====================================================
-- PROFILES TABLE
-- =====================================================
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    company_size TEXT,
    industry TEXT,
    role TEXT,
    ai_mode_preference user_ai_preference DEFAULT 'ai',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'MXN',
    image_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    features TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    vendor TEXT NOT NULL,
    status product_status DEFAULT 'active',
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_products_features ON products USING GIN(features);
CREATE INDEX idx_products_metadata ON products USING GIN(metadata);

-- Enable RLS for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (status = 'active');

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    type service_type NOT NULL,
    pricing_model pricing_model NOT NULL,
    price_range TEXT NOT NULL,
    duration TEXT,
    provider TEXT NOT NULL,
    expertise_level expertise_level DEFAULT 'intermediate',
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    deliverables TEXT[] DEFAULT '{}',
    status service_status DEFAULT 'active',
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services indexes
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_type ON services(type);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_rating ON services(rating DESC);
CREATE INDEX idx_services_tags ON services USING GIN(tags);
CREATE INDEX idx_services_metadata ON services USING GIN(metadata);

-- Enable RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Services policies (public read, admin write)
CREATE POLICY "Anyone can view active services" ON services FOR SELECT USING (status = 'active');

-- =====================================================
-- USER INTERACTIONS TABLE
-- =====================================================
CREATE TABLE user_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interaction_type interaction_type NOT NULL,
    content TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User interactions indexes
CREATE INDEX idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX idx_user_interactions_created_at ON user_interactions(created_at DESC);

-- Enable RLS for user interactions
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- User interactions policies
CREATE POLICY "Users can view own interactions" ON user_interactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own interactions" ON user_interactions FOR INSERT WITH CHECK (user_id = auth.uid());

-- =====================================================
-- EMBEDDINGS TABLE (for vector search)
-- =====================================================
CREATE TABLE embeddings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    content_type content_type NOT NULL,
    content_id UUID NOT NULL,
    embedding vector(1536), -- OpenAI text-embedding-3-large dimensions
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Embeddings indexes
CREATE INDEX idx_embeddings_content_type ON embeddings(content_type);
CREATE INDEX idx_embeddings_content_id ON embeddings(content_id);
CREATE INDEX idx_embeddings_vector ON embeddings USING ivfflat (embedding vector_cosine_ops);

-- Enable RLS for embeddings
ALTER TABLE embeddings ENABLE ROW LEVEL SECURITY;

-- Embeddings policies (public read for search)
CREATE POLICY "Anyone can search embeddings" ON embeddings FOR SELECT USING (true);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to search products and services using vector similarity
CREATE OR REPLACE FUNCTION search_products_services(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.8,
    match_count int DEFAULT 10
)
RETURNS TABLE (
    id UUID,
    content TEXT,
    content_type content_type,
    content_id UUID,
    similarity float
)
LANGUAGE sql
STABLE
AS $$
    SELECT
        e.id,
        e.content,
        e.content_type,
        e.content_id,
        1 - (e.embedding <=> query_embedding) AS similarity
    FROM embeddings e
    WHERE 1 - (e.embedding <=> query_embedding) > match_threshold
    ORDER BY e.embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Function to get personalized recommendations
CREATE OR REPLACE FUNCTION get_personalized_recommendations(
    user_industry TEXT DEFAULT '',
    company_size TEXT DEFAULT '',
    budget_range TEXT DEFAULT '',
    current_context TEXT DEFAULT ''
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
    result JSONB;
    recommended_products JSONB;
    recommended_services JSONB;
BEGIN
    -- Get recommended products based on industry and budget
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', p.id,
            'name', p.name,
            'description', p.description,
            'category', p.category,
            'price', p.price,
            'rating', p.rating,
            'image_url', p.image_url
        )
    )
    INTO recommended_products
    FROM products p
    WHERE p.status = 'active'
    AND (
        user_industry = '' 
        OR p.tags @> ARRAY[user_industry]
        OR p.category ILIKE '%' || user_industry || '%'
    )
    ORDER BY p.rating DESC, p.review_count DESC
    LIMIT 5;

    -- Get recommended services based on company size and needs
    SELECT jsonb_agg(
        jsonb_build_object(
            'id', s.id,
            'name', s.name,
            'description', s.description,
            'category', s.category,
            'type', s.type,
            'price_range', s.price_range,
            'rating', s.rating,
            'provider', s.provider
        )
    )
    INTO recommended_services
    FROM services s
    WHERE s.status = 'active'
    AND (
        company_size = ''
        OR s.tags @> ARRAY[company_size]
        OR s.requirements @> ARRAY[company_size]
    )
    ORDER BY s.rating DESC, s.review_count DESC
    LIMIT 5;

    -- Build result with AI explanation
    result := jsonb_build_object(
        'products', COALESCE(recommended_products, '[]'::jsonb),
        'services', COALESCE(recommended_services, '[]'::jsonb),
        'ai_explanation', 'Estas recomendaciones se basan en tu industria (' || 
                         COALESCE(user_industry, 'no especificada') || 
                         ') y tamaño de empresa (' || 
                         COALESCE(company_size, 'no especificado') || 
                         '). He seleccionado soluciones con las mejores calificaciones y más relevantes para tu perfil.'
    );

    RETURN result;
END;
$$;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger function to create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert sample products
INSERT INTO products (name, description, category, price, vendor, rating, review_count, features, tags) VALUES
('ERP Integral PyME', 'Sistema ERP completo diseñado para pequeñas y medianas empresas mexicanas', 'Software Empresarial', 15000.00, 'TechMéxico', 4.5, 125, 
 ARRAY['Contabilidad', 'Inventarios', 'Ventas', 'Compras', 'Nómina'], 
 ARRAY['erp', 'contabilidad', 'pyme', 'mexico']),

('CRM Ventas Pro', 'Gestión de relaciones con clientes enfocado en equipos de ventas', 'CRM', 8500.00, 'VentasMX', 4.7, 89, 
 ARRAY['Seguimiento leads', 'Pipeline ventas', 'Automatización', 'Reportes'], 
 ARRAY['crm', 'ventas', 'leads', 'automatizacion']),

('Plataforma E-commerce', 'Tienda en línea completa con integración a marketplaces mexicanos', 'E-commerce', 12000.00, 'DigitalStore', 4.3, 156, 
 ARRAY['Tienda online', 'MercadoLibre', 'Amazon México', 'Pagos en línea'], 
 ARRAY['ecommerce', 'tienda', 'marketplace', 'pagos']);

-- Insert sample services
INSERT INTO services (name, description, category, type, pricing_model, price_range, provider, rating, review_count, tags, requirements, deliverables) VALUES
('Consultoría Transformación Digital', 'Diagnóstico y roadmap para digitalización empresarial', 'Consultoría', 'consultation', 'fixed', '$50,000 - $150,000 MXN', 'Digital Consultores', 4.8, 45,
 ARRAY['transformacion', 'digital', 'consultoria', 'roadmap'],
 ARRAY['PyME con 20+ empleados', 'Presupuesto definido', 'Compromiso directivo'],
 ARRAY['Diagnóstico digital', 'Roadmap 12 meses', 'Plan de implementación', 'Capacitación']),

('Implementación ERP', 'Instalación y configuración de sistemas ERP', 'Implementación', 'implementation', 'fixed', '$80,000 - $250,000 MXN', 'ERP Partners', 4.6, 78,
 ARRAY['erp', 'implementacion', 'configuracion', 'migracion'],
 ARRAY['Sistema ERP seleccionado', 'Procesos documentados', '3-6 meses disponibilidad'],
 ARRAY['ERP configurado', 'Migración de datos', 'Capacitación usuarios', 'Soporte 30 días']),

('Soporte TI Especializado', 'Soporte técnico mensual para infraestructura TI', 'Soporte', 'support', 'monthly', '$15,000 - $45,000 MXN/mes', 'TechSupport MX', 4.4, 234,
 ARRAY['soporte', 'infraestructura', 'ti', 'mensual'],
 ARRAY['Infraestructura TI existente', 'Contrato mínimo 6 meses'],
 ARRAY['Soporte 24/7', 'Mantenimiento preventivo', 'Monitoreo', 'Reportes mensuales']);

-- =====================================================
-- SECURITY & PERFORMANCE
-- =====================================================

-- Create indexes for better performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_company_size ON profiles(company_size);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_industry ON profiles(industry);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_ai_preference ON profiles(ai_mode_preference);

-- Analyze tables for better query planning
ANALYZE profiles;
ANALYZE products;
ANALYZE services;
ANALYZE user_interactions;
ANALYZE embeddings;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Set up realtime subscriptions (optional)
-- These can be enabled for real-time features
-- ALTER PUBLICATION supabase_realtime ADD TABLE products;
-- ALTER PUBLICATION supabase_realtime ADD TABLE services;
-- ALTER PUBLICATION supabase_realtime ADD TABLE user_interactions;
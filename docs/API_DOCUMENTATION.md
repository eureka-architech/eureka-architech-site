# EurekaArchiTech - API Documentation

## 📋 Información General

| Atributo | Valor |
|----------|-------|
| **API Base URL** | `https://eureka-architech.com/api` |
| **Versión** | v1.0 |
| **Protocolo** | HTTPS/REST |
| **Autenticación** | JWT Bearer Token |
| **Formato de Respuesta** | JSON |
| **Rate Limiting** | 100 requests/min |

---

## 🔐 Autenticación

### JWT Token Structure

```typescript
interface JWTPayload {
  sub: string;           // User ID
  email: string;         // User email
  role: 'user' | 'admin' | 'consultant';
  iat: number;          // Issued at
  exp: number;          // Expires at
  aud: string;          // Audience
  iss: string;          // Issuer
}
```

### Authentication Headers

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
X-API-Version: v1
```

### Authentication Endpoints

#### POST /api/auth/login
```typescript
// Request
interface LoginRequest {
  email: string;
  password: string;
}

// Response
interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
}
```

#### POST /api/auth/refresh
```typescript
// Request
interface RefreshRequest {
  refresh_token: string;
}

// Response
interface RefreshResponse {
  success: boolean;
  data: {
    access_token: string;
    expires_in: number;
  };
}
```

---

## 👤 User Management API

### User Entity

```typescript
interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company?: string;
  role: 'user' | 'admin' | 'consultant';
  phone?: string;
  created_at: string;
  updated_at: string;
  profile: UserProfile;
}

interface UserProfile {
  industry?: string;
  company_size?: '1-10' | '11-50' | '51-200' | '201-500' | '500+';
  interests?: string[];
  timezone?: string;
  language: 'es' | 'en';
}
```

### GET /api/users/me
```typescript
// Headers: Authorization required
// Response
interface GetUserResponse {
  success: boolean;
  data: User;
}
```

### PUT /api/users/me
```typescript
// Request
interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  company?: string;
  phone?: string;
  profile?: Partial<UserProfile>;
}

// Response
interface UpdateUserResponse {
  success: boolean;
  data: User;
  message: string;
}
```

---

## 📧 Contact & Lead Management API

### Lead Entity

```typescript
interface Lead {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  phone?: string;
  message: string;
  source: 'website' | 'landing' | 'referral' | 'social';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  lead_score: number;
  created_at: string;
  updated_at: string;
  metadata: LeadMetadata;
}

interface LeadMetadata {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url: string;
  user_agent: string;
  ip_address: string;
  country?: string;
  referrer?: string;
}
```

### POST /api/leads
```typescript
// Request
interface CreateLeadRequest {
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  phone?: string;
  message: string;
  service_interest?: string[];
  budget_range?: 'under-50k' | '50k-200k' | '200k-500k' | 'over-500k';
  timeline?: 'immediate' | '1-3-months' | '3-6-months' | '6-12-months';
  metadata?: Partial<LeadMetadata>;
}

// Response
interface CreateLeadResponse {
  success: boolean;
  data: {
    id: string;
    status: string;
    next_steps: string[];
  };
  message: string;
}
```

### GET /api/leads
```typescript
// Query Parameters
interface LeadListQuery {
  page?: number;
  limit?: number;
  status?: Lead['status'];
  source?: Lead['source'];
  date_from?: string;
  date_to?: string;
  search?: string;
}

// Response
interface LeadListResponse {
  success: boolean;
  data: {
    leads: Lead[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
}
```

---

## 📊 Analytics & Metrics API

### Website Analytics

#### GET /api/analytics/overview
```typescript
// Query Parameters
interface AnalyticsQuery {
  period: '24h' | '7d' | '30d' | '90d' | '1y';
  metrics?: string[]; // ['pageviews', 'sessions', 'bounceRate', 'conversion']
}

// Response
interface AnalyticsOverview {
  success: boolean;
  data: {
    period: string;
    metrics: {
      pageviews: {
        current: number;
        previous: number;
        change_percentage: number;
      };
      unique_visitors: {
        current: number;
        previous: number;
        change_percentage: number;
      };
      bounce_rate: {
        current: number;
        previous: number;
        change_percentage: number;
      };
      avg_session_duration: {
        current: number; // seconds
        previous: number;
        change_percentage: number;
      };
      conversion_rate: {
        current: number;
        previous: number;
        change_percentage: number;
      };
    };
    top_pages: Array<{
      path: string;
      pageviews: number;
      unique_visitors: number;
    }>;
    traffic_sources: Array<{
      source: string;
      visitors: number;
      percentage: number;
    }>;
  };
}
```

### Performance Metrics

#### GET /api/analytics/performance
```typescript
// Response
interface PerformanceMetrics {
  success: boolean;
  data: {
    core_web_vitals: {
      lcp: {
        p75: number; // 75th percentile
        status: 'good' | 'needs-improvement' | 'poor';
      };
      fid: {
        p75: number;
        status: 'good' | 'needs-improvement' | 'poor';
      };
      cls: {
        p75: number;
        status: 'good' | 'needs-improvement' | 'poor';
      };
    };
    lighthouse_scores: {
      performance: number;
      accessibility: number;
      best_practices: number;
      seo: number;
      last_updated: string;
    };
    uptime: {
      current_status: 'up' | 'down' | 'degraded';
      uptime_percentage: number;
      incidents_last_30d: number;
    };
  };
}
```

---

## 🤖 AI/ML API Endpoints

### ARIA Assistant

#### POST /api/ai/chat
```typescript
// Request
interface ChatRequest {
  message: string;
  conversation_id?: string;
  context?: {
    page_url?: string;
    user_intent?: 'information' | 'consultation' | 'pricing' | 'support';
    previous_messages?: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: string;
    }>;
  };
}

// Response
interface ChatResponse {
  success: boolean;
  data: {
    response: string;
    conversation_id: string;
    suggestions?: string[];
    actions?: Array<{
      type: 'schedule_call' | 'download_resource' | 'contact_form';
      label: string;
      url?: string;
    }>;
    confidence_score: number;
  };
}
```

### Semantic Search

#### POST /api/ai/search
```typescript
// Request
interface SemanticSearchRequest {
  query: string;
  filters?: {
    content_type?: 'service' | 'case_study' | 'blog' | 'resource';
    industry?: string;
    service_category?: string;
  };
  limit?: number;
}

// Response
interface SemanticSearchResponse {
  success: boolean;
  data: {
    results: Array<{
      id: string;
      title: string;
      content_type: string;
      excerpt: string;
      url: string;
      similarity_score: number;
      metadata: {
        industry?: string;
        service_category?: string;
        tags?: string[];
      };
    }>;
    total_results: number;
    query_intent: string;
  };
}
```

### Lead Scoring & Qualification

#### POST /api/ai/score-lead
```typescript
// Request
interface LeadScoringRequest {
  lead_id: string;
  additional_data?: {
    company_website?: string;
    linkedin_profile?: string;
    industry_signals?: string[];
  };
}

// Response
interface LeadScoringResponse {
  success: boolean;
  data: {
    lead_id: string;
    score: number; // 0-100
    qualification_level: 'cold' | 'warm' | 'hot' | 'qualified';
    reasoning: string[];
    recommended_actions: Array<{
      action: string;
      priority: 'high' | 'medium' | 'low';
      timeline: string;
    }>;
    industry_fit: number;
    budget_fit: number;
    timeline_fit: number;
  };
}
```

---

## 📈 Business Intelligence API

### Service Performance

#### GET /api/business/service-performance
```typescript
// Query Parameters
interface ServicePerformanceQuery {
  service_id?: string;
  period: '7d' | '30d' | '90d' | '1y';
  metrics?: string[];
}

// Response
interface ServicePerformanceResponse {
  success: boolean;
  data: {
    services: Array<{
      id: string;
      name: string;
      category: string;
      metrics: {
        page_views: number;
        inquiries: number;
        conversion_rate: number;
        avg_engagement_time: number;
        bounce_rate: number;
      };
      performance_trend: 'increasing' | 'stable' | 'decreasing';
      top_keywords: string[];
      common_questions: string[];
    }>;
    overall_metrics: {
      total_inquiries: number;
      avg_conversion_rate: number;
      top_performing_service: string;
      growth_rate: number;
    };
  };
}
```

### Client Insights

#### GET /api/business/client-insights
```typescript
// Response
interface ClientInsightsResponse {
  success: boolean;
  data: {
    demographics: {
      company_sizes: Array<{
        size: string;
        count: number;
        percentage: number;
      }>;
      industries: Array<{
        industry: string;
        count: number;
        percentage: number;
        avg_project_value: number;
      }>;
      geographic_distribution: Array<{
        region: string;
        count: number;
        percentage: number;
      }>;
    };
    engagement_patterns: {
      peak_inquiry_days: string[];
      peak_inquiry_hours: number[];
      avg_research_duration: number; // days
      most_visited_pages: string[];
    };
    conversion_funnel: {
      website_visitors: number;
      form_submissions: number;
      consultations_scheduled: number;
      proposals_sent: number;
      projects_won: number;
      conversion_rates: {
        visitor_to_lead: number;
        lead_to_consultation: number;
        consultation_to_proposal: number;
        proposal_to_project: number;
      };
    };
  };
}
```

---

## 📱 Newsletter & Communication API

### Newsletter Management

#### POST /api/newsletter/subscribe
```typescript
// Request
interface NewsletterSubscribeRequest {
  email: string;
  first_name?: string;
  interests?: string[];
  source?: string;
  double_opt_in?: boolean;
}

// Response
interface NewsletterSubscribeResponse {
  success: boolean;
  data: {
    subscriber_id: string;
    status: 'pending' | 'confirmed';
    confirmation_sent: boolean;
  };
  message: string;
}
```

#### GET /api/newsletter/subscribers
```typescript
// Query Parameters (Admin only)
interface SubscriberListQuery {
  page?: number;
  limit?: number;
  status?: 'pending' | 'confirmed' | 'unsubscribed';
  interests?: string[];
  date_from?: string;
  date_to?: string;
}

// Response
interface SubscriberListResponse {
  success: boolean;
  data: {
    subscribers: Array<{
      id: string;
      email: string;
      first_name?: string;
      status: string;
      interests: string[];
      subscribed_at: string;
      last_engaged: string;
      engagement_score: number;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
    statistics: {
      total_subscribers: number;
      confirmed_subscribers: number;
      avg_engagement_rate: number;
      growth_rate: number;
    };
  };
}
```

---

## 🔍 Search & Content API

### Content Search

#### GET /api/content/search
```typescript
// Query Parameters
interface ContentSearchQuery {
  q: string;                    // Search query
  type?: 'service' | 'case_study' | 'blog' | 'page';
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  sort_by?: 'relevance' | 'date' | 'popularity';
}

// Response
interface ContentSearchResponse {
  success: boolean;
  data: {
    results: Array<{
      id: string;
      title: string;
      type: string;
      excerpt: string;
      url: string;
      image_url?: string;
      published_date: string;
      tags: string[];
      relevance_score: number;
    }>;
    facets: {
      types: Array<{ name: string; count: number }>;
      categories: Array<{ name: string; count: number }>;
      tags: Array<{ name: string; count: number }>;
    };
    pagination: {
      offset: number;
      limit: number;
      total: number;
    };
    search_metadata: {
      query: string;
      search_time_ms: number;
      suggestions?: string[];
    };
  };
}
```

---

## 📅 Calendar & Scheduling API

### Consultation Booking

#### GET /api/calendar/availability
```typescript
// Query Parameters
interface AvailabilityQuery {
  consultant_id?: string;
  date_from: string;    // YYYY-MM-DD
  date_to: string;      // YYYY-MM-DD
  duration?: number;    // minutes, default: 60
  timezone?: string;    // default: America/Mexico_City
}

// Response
interface AvailabilityResponse {
  success: boolean;
  data: {
    available_slots: Array<{
      datetime: string;     // ISO 8601
      duration: number;
      consultant: {
        id: string;
        name: string;
        title: string;
        expertise: string[];
      };
    }>;
    timezone: string;
    next_available: string; // ISO 8601
  };
}
```

#### POST /api/calendar/book
```typescript
// Request
interface BookingRequest {
  datetime: string;         // ISO 8601
  consultant_id: string;
  client_info: {
    first_name: string;
    last_name: string;
    email: string;
    company: string;
    phone?: string;
  };
  consultation_details: {
    service_interest: string[];
    budget_range?: string;
    timeline?: string;
    additional_notes?: string;
  };
  timezone: string;
}

// Response
interface BookingResponse {
  success: boolean;
  data: {
    booking_id: string;
    confirmation_number: string;
    datetime: string;
    consultant: {
      name: string;
      email: string;
    };
    meeting_details: {
      meeting_url?: string;
      meeting_type: 'video' | 'phone' | 'in_person';
      duration: number;
    };
    calendar_links: {
      google: string;
      outlook: string;
      ics: string;
    };
  };
  message: string;
}
```

---

## ⚠️ Error Handling

### Standard Error Response

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    request_id: string;
  };
}
```

### Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | `INVALID_REQUEST` | Malformed request or invalid parameters |
| 401 | `UNAUTHORIZED` | Authentication required or invalid token |
| 403 | `FORBIDDEN` | Access denied for this resource |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource already exists or conflict |
| 422 | `VALIDATION_ERROR` | Input validation failed |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error |
| 502 | `BAD_GATEWAY` | Upstream service error |
| 503 | `SERVICE_UNAVAILABLE` | Service temporarily unavailable |

### Example Error Responses

```typescript
// Validation Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "details": {
      "email": ["Email is required"],
      "phone": ["Invalid phone number format"]
    },
    "timestamp": "2025-01-15T10:30:00Z",
    "request_id": "req_abc123"
  }
}

// Authentication Error
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "timestamp": "2025-01-15T10:30:00Z",
    "request_id": "req_def456"
  }
}
```

---

## 🔒 Rate Limiting

### Default Limits

| Endpoint Category | Requests per Minute | Requests per Hour |
|------------------|---------------------|-------------------|
| Authentication | 10 | 50 |
| Public Content | 100 | 1000 |
| Form Submissions | 5 | 20 |
| AI/ML Endpoints | 20 | 100 |
| Analytics (Admin) | 60 | 500 |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642244400
X-RateLimit-Window: 60
```

---

## 📋 Response Headers

### Standard Headers

```http
Content-Type: application/json; charset=utf-8
X-API-Version: v1.0
X-Request-ID: req_abc123def456
X-Response-Time: 156ms
Cache-Control: no-cache, no-store, must-revalidate
```

---

## 🧪 Testing & Development

### Base URLs

| Environment | URL |
|-------------|-----|
| **Production** | `https://eureka-architech.com/api` |
| **Staging** | `https://staging.eureka-architech.com/api` |
| **Development** | `http://localhost:4321/api` |

### API Testing

```bash
# Test authentication
curl -X POST https://eureka-architech.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password"}'

# Test protected endpoint
curl -X GET https://eureka-architech.com/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Test form submission
curl -X POST https://eureka-architech.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@company.com",
    "first_name": "John",
    "last_name": "Doe",
    "company": "Tech Corp",
    "message": "Interested in digital transformation services"
  }'
```

### Postman Collection

Una colección completa de Postman está disponible en:
`/docs/postman/EurekaArchiTech_API.postman_collection.json`

---

## 📞 Soporte de API

### Contacto Técnico

- **Email**: api-support@eureka-architech.com
- **Slack**: #api-support (team interno)
- **Documentation**: https://docs.eureka-architech.com
- **Status Page**: https://status.eureka-architech.com

### SLA & Soporte

| Nivel | Tiempo de Respuesta | Disponibilidad |
|-------|-------------------|---------------|
| **Production** | 99.9% uptime | 24/7 monitoring |
| **Support Response** | <2 hours business | <8 hours critical |
| **Documentation** | Real-time updates | Version controlled |

---

*Última actualización: Enero 2025*  
*Versión de API: v1.0*  
*Mantenido por: EurekaArchiTech Engineering Team*
// Contact Configuration
export const contactInfo = {
  phone: {
    display: '+52 (33) 1234 5678', // Actualizar con número real
    raw: '+523312345678',
    whatsapp: '523312345678'
  },
  email: {
    support: 'contacto@eurekaproducts.mx',
    sales: 'ventas@eurekaproducts.mx',
    info: 'info@eurekaproducts.mx'
  },
  social: {
    linkedin: 'https://linkedin.com/company/eureka-products',
    twitter: 'https://twitter.com/eurekaproducts',
    facebook: 'https://facebook.com/eurekaproducts'
  },
  address: {
    street: 'Av. Américas 1545',
    colony: 'Providencia',
    city: 'Guadalajara',
    state: 'Jalisco',
    country: 'México',
    postalCode: '44630'
  },
  businessHours: {
    weekdays: '9:00 AM - 6:00 PM CST',
    saturday: '10:00 AM - 2:00 PM CST',
    sunday: 'Cerrado'
  }
};

// API Endpoints Configuration
export const apiEndpoints = {
  contactForm: process.env.PUBLIC_API_URL + '/api/contact',
  newsletter: process.env.PUBLIC_API_URL + '/api/newsletter',
  chatbot: process.env.PUBLIC_API_URL + '/api/chatbot'
};

// Analytics Configuration
export const analytics = {
  gtmId: process.env.PUBLIC_GTM_ID || '',
  gaId: process.env.PUBLIC_GA_ID || '',
  fbPixelId: process.env.PUBLIC_FB_PIXEL_ID || ''
};
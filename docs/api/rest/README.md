# 📡 API REST Documentation

## Base URL
```
Production: https://api.eureka.mx/v1
Staging: https://api-staging.eureka.mx/v1
Development: http://localhost:3000/api/v1
```

## Authentication

All API requests require authentication using JWT tokens.

```bash
curl -X GET https://api.eureka.mx/v1/diagnostics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

## Common Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | Bearer token for authentication |
| `Content-Type` | Yes | Usually `application/json` |
| `X-Request-ID` | No | Unique request identifier for tracking |
| `X-Client-Version` | No | Client app version |

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2025-01-20T10:30:00Z",
    "version": "1.0.0"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource was not found",
    "details": {
      // Additional error details
    }
  },
  "meta": {
    "timestamp": "2025-01-20T10:30:00Z",
    "request_id": "req_123456"
  }
}
```

## Endpoints

### Diagnostics

#### Create Diagnostic
```http
POST /diagnostics
```

**Request Body:**
```json
{
  "organization_id": "org_123",
  "type": "comprehensive",
  "mode": "ai",
  "data": {
    // Diagnostic input data
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "diagnostic_id": "diag_456",
    "status": "processing",
    "estimated_completion": "2025-01-20T10:35:00Z"
  }
}
```

#### Get Diagnostic Results
```http
GET /diagnostics/{diagnostic_id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "diagnostic_id": "diag_456",
    "status": "completed",
    "results": {
      "maturity_score": 72,
      "dimensions": [
        {
          "name": "technology",
          "score": 65,
          "insights": ["..."]
        }
      ],
      "recommendations": ["..."],
      "roadmap": {
        // Transformation roadmap
      }
    }
  }
}
```

### Services

#### List Services
```http
GET /services?category={category}&mode={mode}
```

**Query Parameters:**
- `category` (optional): Filter by service category
- `mode` (optional): `ai` or `traditional`
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page (default: 20)

#### Get Service Details
```http
GET /services/{service_id}
```

### RTT (Recursos Temporales de Transición)

#### Search RTT
```http
POST /rtt/search
```

**Request Body:**
```json
{
  "skills": ["python", "aws", "leadership"],
  "availability": {
    "start_date": "2025-02-01",
    "duration_weeks": 12
  },
  "budget_range": {
    "min": 50000,
    "max": 100000,
    "currency": "MXN"
  }
}
```

## Rate Limiting

- **Default**: 100 requests per minute per user
- **Authenticated**: 1000 requests per minute
- **Enterprise**: Custom limits

Rate limit information is included in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Pagination

For endpoints that return lists:

```http
GET /services?page=2&limit=20
```

**Response includes:**
```json
{
  "data": [...],
  "pagination": {
    "current_page": 2,
    "per_page": 20,
    "total_pages": 10,
    "total_items": 200,
    "has_next": true,
    "has_previous": true
  }
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Invalid request data |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Webhooks

Configure webhooks to receive real-time updates:

```http
POST /webhooks
```

**Request Body:**
```json
{
  "url": "https://your-domain.com/webhook",
  "events": ["diagnostic.completed", "rtt.matched"],
  "secret": "your-webhook-secret"
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { EurekaClient } from '@eureka/sdk';

const client = new EurekaClient({
  apiKey: process.env.EUREKA_API_KEY,
  environment: 'production'
});

// Create diagnostic
const diagnostic = await client.diagnostics.create({
  organizationId: 'org_123',
  type: 'comprehensive',
  mode: 'ai'
});

// Get results
const results = await client.diagnostics.get(diagnostic.id);
```

### Python
```python
from eureka import EurekaClient

client = EurekaClient(
    api_key=os.environ['EUREKA_API_KEY'],
    environment='production'
)

# Create diagnostic
diagnostic = client.diagnostics.create(
    organization_id='org_123',
    type='comprehensive',
    mode='ai'
)

# Get results
results = client.diagnostics.get(diagnostic['id'])
```

---

For more detailed API documentation, visit our [API Reference](https://developers.eureka.mx)
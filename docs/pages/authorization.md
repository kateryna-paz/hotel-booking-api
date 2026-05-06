---
title: Authorization
sidebar_label: Authorization
---

The Hotel Booking API uses **JWT Bearer Token** authentication for all write operations (`POST`, `PUT`, `PATCH`, `DELETE`).

Read operations (`GET`) on public endpoints do not require authentication.

## Authentication Scheme

| Scheme | Type | Header          | Format           |
| ------ | ---- | --------------- | ---------------- |
| Bearer | HTTP | `Authorization` | `Bearer <token>` |

## Obtaining a Token

Authenticate against your identity provider to obtain a JWT:

```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## Using the Token

### Via SDK

```typescript
import HotelBookingClient from "hotel-booking-api-sdk";

const client = new HotelBookingClient({
  baseUrl: "https://api.hotelbooking.example.com/v1",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
});

// Create a hotel (requires auth)
const hotel = await client.hotels.create({
  name: "Grand Palace Hotel",
  city: "Kyiv",
  address: "1 Khreshchatyk St",
  stars: 5,
});
```

### Updating the Token at Runtime

```typescript
// After token refresh
client.setToken("new-jwt-token");
```

### Via HTTP Header

```http
POST /v1/hotels
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Grand Palace Hotel",
  "city": "Kyiv",
  "address": "1 Khreshchatyk St",
  "stars": 5
}
```

## Error Responses

| Status | Code           | Reason                            |
| ------ | -------------- | --------------------------------- |
| `401`  | `UNAUTHORIZED` | Missing or invalid Bearer token   |
| `403`  | `FORBIDDEN`    | Valid token but insufficient role |

**Example 401 response:**

```json
{
  "code": "UNAUTHORIZED",
  "message": "Bearer token is missing or invalid"
}
```

## Security Best Practices

- Store tokens in memory or a secure store — **never in `localStorage`**
- Rotate tokens regularly and handle `401` responses with automatic refresh
- Use HTTPS for all API calls
- Restrict token scopes to the minimum required permissions

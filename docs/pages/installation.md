---
title: Installation
sidebar_label: Installation
---

## Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **yarn** ≥ 1.22

## Installing the SDK

Install the Hotel Booking API TypeScript SDK from npm:

```bash
npm install hotel-booking-api-sdk
# or
yarn add hotel-booking-api-sdk
```

## Initializing the Client

```typescript
import HotelBookingClient from 'hotel-booking-api-sdk';

const client = new HotelBookingClient({
  baseUrl: 'https://api.hotelbooking.example.com/v1',
  token: 'your-jwt-token',   // optional for public endpoints
  timeout: 10000,             // ms, default 10s
});
```

## Making Your First Request

```typescript
// Fetch all 5-star hotels in Kyiv
const { data: hotels } = await client.hotels.list({
  city: 'Kyiv',
  stars: 5,
});

console.log(hotels);
```

## Building from Source

If you prefer to build the SDK yourself:

```bash
git clone https://github.com/your-username/hotel-booking-api.git
cd hotel-booking-api/sdk
npm install
npm run build
```

The compiled output will be placed in `sdk/dist/`.

## SDK Repository

The full SDK source code and OpenAPI specification are available on GitHub:

👉 **[github.com/your-username/hotel-booking-api](https://github.com/your-username/hotel-booking-api)**

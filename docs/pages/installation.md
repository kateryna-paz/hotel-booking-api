---
title: Installation
sidebar_label: Installation
---

## Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0 or **yarn** ≥ 1.22

## Installing the SDK

Clone the repository and build the SDK locally:

```bash
git clone https://github.com/kateryna-paz/hotel-booking-docs.git
cd hotel-booking-docs/sdk
npm install
npm run build
```

The compiled output will be placed in `sdk/dist/`.

## Initializing the Client

```typescript
import HotelBookingClient from "hotel-booking-api-sdk";

const client = new HotelBookingClient({
  baseUrl: "https://api.hotelbooking.example.com/v1",
  token: "your-jwt-token", // optional for public endpoints
  timeout: 10000, // ms, default 10s
});
```

## Making Your First Request

```typescript
// Fetch all 5-star hotels in Kyiv
const { data: hotels } = await client.hotels.list({
  city: "Kyiv",
  stars: 5,
});

console.log(hotels);
```

## SDK Repository

The full SDK source code and OpenAPI specification are available on GitHub:

👉 **[github.com/kateryna-paz/hotel-booking-docs](https://github.com/kateryna-paz/hotel-booking-docs)**

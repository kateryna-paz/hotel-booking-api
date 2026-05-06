# Hotel Booking API – TypeScript SDK

TypeScript/Fetch SDK generated from the Hotel Booking API OpenAPI 3.0.3 specification.

## Installation

\```bash
npm install hotel-booking-api-sdk
\```

> **Node.js ≥ 18** is required (uses the native `fetch` API).

## Quick Start

\```typescript
import HotelBookingClient from 'hotel-booking-api-sdk';

const client = new HotelBookingClient({
baseUrl: 'https://api.hotelbooking.example.com/v1',
token: 'your-jwt-token',
});

// List hotels in Kyiv with 5 stars
const { data: hotels } = await client.hotels.list({ city: 'Kyiv', stars: 5 });
console.log(hotels);
\```

## API Reference

### Hotels

\```typescript
await client.hotels.list({ city?: string, stars?: 1|2|3|4|5 });
await client.hotels.get('h-001');
await client.hotels.create({ name, city, address, stars });
await client.hotels.update('h-001', { name, city, address, stars });
await client.hotels.patch('h-001', { stars: 4 });
await client.hotels.delete('h-001');
\```

### Rooms

\```typescript
const rooms = client.rooms('h-001');

await rooms.list({ available?: boolean, type?: 'single'|'double'|'suite'|'deluxe' });
await rooms.get('r-101');
await rooms.create({ number, type, floor, pricePerNight, capacity });
await rooms.update('r-101', { number, type, floor, pricePerNight, capacity });
await rooms.patch('r-101', { isAvailable: false });
await rooms.delete('r-101');
\```

## Error Handling

\```typescript
import { HotelBookingApiError } from 'hotel-booking-api-sdk';

try {
await client.hotels.get('not-existing');
} catch (err) {
if (err instanceof HotelBookingApiError) {
console.error(err.status); // 404
console.error(err.error.code); // "NOT_FOUND"
console.error(err.error.message); // "Hotel with id 'not-existing' was not found"
}
}
\```

## License

MIT

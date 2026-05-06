# Hotel Booking API

> **Author:** Pazynych Kateryna  
> **Subject:** API Documentation with OpenAPI & Zudoku

REST API for managing hotels and rooms, documented with OpenAPI 3.0.3 and Zudoku.

---

## Repository Structure

```
hotel-booking-api/
├── openapi.yaml               # OpenAPI 3.0.3 specification
├── sdk/                       # TypeScript Fetch SDK
│   ├── src/
│   │   ├── index.ts           # HotelBookingClient class
│   │   └── types.ts           # TypeScript interfaces & types
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── docs/                      # Zudoku documentation site
│   ├── zudoku.config.ts       # Zudoku configuration
│   ├── package.json
│   └── pages/
│       ├── installation.md
│       ├── authorization.md
│       └── about.md
└── .github/
    └── workflows/
        └── deploy-docs.yml    # GitHub Actions CI/CD
```

---

## Quick Start

### 1 — View API specification

Open [openapi.yaml](./openapi.yaml) in [Swagger Editor](https://editor.swagger.io/) — paste the file contents to validate and browse the spec interactively.

### 2 — Use the TypeScript SDK

```bash
cd sdk
npm install
npm run build
```

```typescript
import HotelBookingClient from "./dist";

const client = new HotelBookingClient({
  baseUrl: "https://api.hotelbooking.example.com/v1",
  token: "your-jwt-token",
});

// List all hotels
const { data } = await client.hotels.list({ city: "Kyiv" });

// List available double rooms in hotel h-001
const { data: rooms } = await client.rooms("h-001").list({
  type: "double",
  available: true,
});
```

Full SDK docs → [sdk/README.md](./sdk/README.md)

### 3 — Run the documentation site locally

```bash
cd docs
npm install
cp ../openapi.yaml ./openapi.yaml   # copy spec into docs folder
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## GitHub Pages Deployment

The documentation is automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.

### Manual setup (one-time)

1. Go to your repository → **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow in `.github/workflows/deploy-docs.yml` will build and publish the site

### Live URL

```
https://kateryna-paz.github.io/hotel-booking-api/
```

---

## API Overview

| Entity | Endpoints                                 | Auth required |
| ------ | ----------------------------------------- | ------------- |
| Hotel  | `GET /hotels`                             | No            |
|        | `GET /hotels/{hotelId}`                   | No            |
|        | `POST /hotels`                            | Yes (JWT)     |
|        | `PUT /hotels/{hotelId}`                   | Yes (JWT)     |
|        | `PATCH /hotels/{hotelId}`                 | Yes (JWT)     |
|        | `DELETE /hotels/{hotelId}`                | Yes (JWT)     |
| Room   | `GET /hotels/{hotelId}/rooms`             | No            |
|        | `GET /hotels/{hotelId}/rooms/{roomId}`    | No            |
|        | `POST /hotels/{hotelId}/rooms`            | Yes (JWT)     |
|        | `PUT /hotels/{hotelId}/rooms/{roomId}`    | Yes (JWT)     |
|        | `PATCH /hotels/{hotelId}/rooms/{roomId}`  | Yes (JWT)     |
|        | `DELETE /hotels/{hotelId}/rooms/{roomId}` | Yes (JWT)     |

---

## License

MIT — Pazynych Kateryna

// Hotel Booking API - TypeScript SDK
// Auto-generated from OpenAPI 3.0.3 specification

// ─── Models ───────────────────────────────────────────────────────────────────

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  stars: 1 | 2 | 3 | 4 | 5;
  description?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HotelCreate {
  name: string;
  city: string;
  address: string;
  stars: 1 | 2 | 3 | 4 | 5;
  description?: string;
  phone?: string;
  email?: string;
}

export interface HotelPatch {
  name?: string;
  city?: string;
  address?: string;
  stars?: 1 | 2 | 3 | 4 | 5;
  description?: string;
  phone?: string;
  email?: string;
}

export type RoomType = 'single' | 'double' | 'suite' | 'deluxe';

export interface Room {
  id: string;
  hotelId: string;
  number: string;
  type: RoomType;
  floor: number;
  pricePerNight: number;
  capacity: number;
  isAvailable: boolean;
  amenities?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomCreate {
  number: string;
  type: RoomType;
  floor: number;
  pricePerNight: number;
  capacity: number;
  isAvailable?: boolean;
  amenities?: string[];
}

export interface RoomPatch {
  number?: string;
  type?: RoomType;
  floor?: number;
  pricePerNight?: number;
  capacity?: number;
  isAvailable?: boolean;
  amenities?: string[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedHotels {
  data: Hotel[];
  pagination: Pagination;
}

export interface PaginatedRooms {
  data: Room[];
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ─── Query Params ──────────────────────────────────────────────────────────────

export interface ListHotelsParams {
  page?: number;
  limit?: number;
  city?: string;
  stars?: 1 | 2 | 3 | 4 | 5;
}

export interface ListRoomsParams {
  available?: boolean;
  type?: RoomType;
  minPrice?: number;
  maxPrice?: number;
}

import type {
  Hotel,
  HotelCreate,
  HotelPatch,
  Room,
  RoomCreate,
  RoomPatch,
  PaginatedHotels,
  PaginatedRooms,
  ListHotelsParams,
  ListRoomsParams,
  ApiError,
} from './types';

// ─── Config ────────────────────────────────────────────────────────────────────

export interface HotelBookingClientConfig {
  /** Base URL of the API (default: https://api.hotelbooking.example.com/v1) */
  baseUrl?: string;
  /** JWT Bearer token for authenticated requests */
  token?: string;
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
}

// ─── Error class ──────────────────────────────────────────────────────────────

export class HotelBookingApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly error: ApiError,
  ) {
    super(`[${status}] ${error.code}: ${error.message}`);
    this.name = 'HotelBookingApiError';
  }
}

// ─── Client ───────────────────────────────────────────────────────────────────

export class HotelBookingClient {
  private readonly baseUrl: string;
  private token?: string;
  private readonly timeout: number;

  constructor(config: HotelBookingClientConfig = {}) {
    this.baseUrl = (config.baseUrl ?? 'https://api.hotelbooking.example.com/v1').replace(/\/$/, '');
    this.token = config.token;
    this.timeout = config.timeout ?? 10_000;
  }

  /** Update the auth token at runtime (e.g. after refresh) */
  setToken(token: string): void {
    this.token = token;
  }

  // ── Internal fetch helper ──────────────────────────────────────────────────

  private async request<T>(
    method: string,
    path: string,
    options: { body?: unknown; params?: Record<string, unknown> } = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (options.params) {
      for (const [key, value] of Object.entries(options.params)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 204) {
        return undefined as unknown as T;
      }

      const json = await response.json();

      if (!response.ok) {
        throw new HotelBookingApiError(response.status, json as ApiError);
      }

      return json as T;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof HotelBookingApiError) throw err;
      throw new Error(`Network error: ${(err as Error).message}`);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // HOTELS
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * List all hotels with optional filters.
   * @example
   * const { data } = await client.hotels.list({ city: 'Kyiv', stars: 5 });
   */
  hotels = {
    list: (params?: ListHotelsParams): Promise<PaginatedHotels> =>
      this.request('GET', '/hotels', { params: params as Record<string, unknown> }),

    get: (hotelId: string): Promise<Hotel> =>
      this.request('GET', `/hotels/${hotelId}`),

    create: (body: HotelCreate): Promise<Hotel> =>
      this.request('POST', '/hotels', { body }),

    update: (hotelId: string, body: HotelCreate): Promise<Hotel> =>
      this.request('PUT', `/hotels/${hotelId}`, { body }),

    patch: (hotelId: string, body: HotelPatch): Promise<Hotel> =>
      this.request('PATCH', `/hotels/${hotelId}`, { body }),

    delete: (hotelId: string): Promise<void> =>
      this.request('DELETE', `/hotels/${hotelId}`),
  };

  // ══════════════════════════════════════════════════════════════════════════
  // ROOMS
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * Operations on rooms within a specific hotel.
   * @example
   * const { data } = await client.rooms('h-001').list({ available: true });
   */
  rooms(hotelId: string) {
    const self = this;
    return {
      list: (params?: ListRoomsParams): Promise<PaginatedRooms> =>
        self.request('GET', `/hotels/${hotelId}/rooms`, {
          params: params as Record<string, unknown>,
        }),

      get: (roomId: string): Promise<Room> =>
        self.request('GET', `/hotels/${hotelId}/rooms/${roomId}`),

      create: (body: RoomCreate): Promise<Room> =>
        self.request('POST', `/hotels/${hotelId}/rooms`, { body }),

      update: (roomId: string, body: RoomCreate): Promise<Room> =>
        self.request('PUT', `/hotels/${hotelId}/rooms/${roomId}`, { body }),

      patch: (roomId: string, body: RoomPatch): Promise<Room> =>
        self.request('PATCH', `/hotels/${hotelId}/rooms/${roomId}`, { body }),

      delete: (roomId: string): Promise<void> =>
        self.request('DELETE', `/hotels/${hotelId}/rooms/${roomId}`),
    };
  }
}

// ─── Default export ────────────────────────────────────────────────────────────

export default HotelBookingClient;
export * from './types';

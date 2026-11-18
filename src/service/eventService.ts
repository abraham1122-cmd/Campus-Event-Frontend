

import type { Event, PaginatedEvents } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface EventQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Something went wrong");
  }

  return response.json() as Promise<T>;
}

// GET: Fetch paginated events
export async function getEvents(
  params: EventQueryParams = {}
): Promise<PaginatedEvents> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.category && params.category !== "All") {
    query.set("category", params.category);
  }
  if (params.sortBy) query.set("sortBy", params.sortBy);

  const response = await fetch(
    `${API_URL}/events?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse<PaginatedEvents>(response);
}

// GET: Fetch one event
export async function getEventById(id: number): Promise<Event> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/events/${id}`);

  return handleResponse<Event>(response);
}

// POST: Create an event
export async function createEvent(
  event: Omit<Event, "id">
): Promise<Event> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  return handleResponse<Event>(response);
}
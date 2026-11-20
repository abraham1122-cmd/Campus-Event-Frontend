
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getEvents } from "@/service/eventsService";
import type { Event } from "@/types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError("");

        const data = await getEvents();
        setEvents(data.items);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to retrieve events."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <main className="page events-page">
      <div className="events-header">
        <div>
          <span className="eyebrow">CAMPUS EVENTS</span>
          <h1>Discover Events</h1>
          <p>Explore upcoming events happening on campus.</p>
        </div>

        <Link href="/events/create" className="button primary">
          + Create Event
        </Link>
      </div>

      {loading && <p>Loading events...</p>}

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && events.length === 0 && (
        <p>No events available yet.</p>
      )}

      <div className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event.id}>
            <div className="event-card-content">
              <span className="event-category">
                {event.category}
              </span>

              <h2>{event.title}</h2>

              <p>{event.description}</p>

              <div className="event-meta">
                <span>📍 {event.location}</span>
                <span>
                  📅{" "}
                  {new Date(event.eventDate).toLocaleDateString()}
                </span>
              </div>

              <span
                className={
                  event.isPublished
                    ? "status published"
                    : "status draft"
                }
              >
                {event.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

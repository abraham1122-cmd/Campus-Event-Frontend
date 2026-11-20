


import type { Event } from "@/types/event";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

type EventCategory =
  | "Culture"
  | "Talks"
  | "Community"
  | "Career"
  | "Music"
  | "Workshop";

const categoryImages: Record<EventCategory, string> = {
  Culture:
    "https://images.unsplash.com/photo-1526976668912-1a811878dd37?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",

  Talks:
    "https://images.unsplash.com/photo-1667515385986-2d4263c4d3db?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",

  Community:
    "https://images.unsplash.com/photo-1517457133997-cca417e4a561?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",

  Career:
    "https://images.unsplash.com/photo-1547382002-b908c9367d83?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",

  Music:
    "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",

  Workshop:
    "https://images.unsplash.com/photo-1663162550974-aaf76bcdeedf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
};

function getEventImage(category: string): string {
  return (
    categoryImages[category as EventCategory] ??
    categoryImages
  );
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.eventDate);

  return (
    <article className="event-card">
      {/* Event image */}
      <div className="event-image">
        {/* || getEventImage(event.category) */}
        <img
          src={event.image || getEventImage(event.image)} 
          alt={event.title}
          style={{
    width: "100%",
    height: "250px",
    objectFit: "cover",
          }}
        />

        <span>{event.category}</span>
      </div>

      {/* Event information */}
      <div className="event-card-content">
        {/* Date */}
        <div className="event-date">
          <strong>{eventDate.getDate()}</strong>

          <span>
            {eventDate
              .toLocaleDateString("en-US", {
                month: "short",
              })
              .toUpperCase()}
          </span>
        </div>

        {/* Details */}
        <div>
          <h2>{event.title}</h2>

          <p>
            <span aria-hidden="true">◷</span>{" "}
            {formatTime(event.eventDate)}

            <b> · </b>

            <span aria-hidden="true">⌖</span>{" "}
            {event.location}
          </p>

          <footer>
            <span>
              <span aria-hidden="true">▦</span>{" "}
              {formatDate(event.eventDate)}
            </span>

            <Link 
            href={`/events/${event.id}`}
            className="text-indigo-600 font-medium" 
            >
              View <span aria-hidden="true"></span>
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}

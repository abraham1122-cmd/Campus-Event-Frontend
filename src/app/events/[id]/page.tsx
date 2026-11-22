


export const dynamic = "force-dynamic"

import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "@/service/eventsService";



interface EventDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}


function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  const event = await getEventById(Number(id));

  if (!event || !event.isPublished) {
    notFound();
  }

  return (
    <section className="details-page mx-auto max-w-5xl px-6 py-12">
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
      >
        ← Back to events
      </Link>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {event.image && (
          <div className="h-64 w-full overflow-hidden md:h-96">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="bg-indigo-50 px-8 py-12">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
            {event.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            {event.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">
            {event.description}
          </p>
        </div>

        <div className="grid gap-8 p-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Event date
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              {formatDate(event.eventDate)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Event time
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              {formatTime(event.eventDate)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Location
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              {event.location}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">
              Category
            </p>
            <p className="mt-2 font-semibold text-gray-900">
              {event.category}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

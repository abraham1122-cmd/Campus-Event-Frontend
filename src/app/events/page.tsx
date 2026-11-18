


"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { Event } from "@/types/event";
import { seedEvents } from "@/data/events";

import SearchBar from "@/components/events/searchBar";
import EventFilter from "@/components/events/eventFilters";
import EventCard from "@/components/events/eventCard";
import Loading from "@/components/events/loading";
import Pagination from "@/components/events/pagination";

type SortOption = "Soonest" | "Latest";

const categories = [
  "All",
  "Culture",
  "Talks",
  "Community",
  "Career",
  "Music",
  "Workshop",
];

export default function EventsPage() {
  const [events] = useState<Event[]>(seedEvents);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("Soonest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);

  const itemsPerPage = 4;

  // Search, filter and sort events.
  const filteredEvents = useMemo(() => {
    const result = events.filter((event) => {
      const matchesCategory =
        category === "All" || event.category === category;

      const searchText =
        `${event.title} ${event.category} ${event.location}`.toLowerCase();

      const matchesSearch = searchText.includes(query.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch &&
        event.isPublished
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "Latest") {
        return b.eventDate - a.eventDate;
      }

      return a.eventDate - b.eventDate;
    });
  }, [events, query, category, sort]);

  // Pagination.
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / itemsPerPage),
  );

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset pagination when search or filters change.
  const handleSearch = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleSort = (value: SortOption) => {
    setSort(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setSort("Soonest");
    setCurrentPage(1);
  };

  return (
    <section className="page events-page">
      {/* Page heading */}
      <div className="page-title">
        <span className="eyebrow">DISCOVER CAMPUS</span>

        <h1>Upcoming events</h1>

        <p>Find something worth showing up for.</p>
      </div>

      {/* Search and filters */}
      <div className="event-tools">
        <SearchBar
          searchQuery={query}
          setSearchQuery={handleSearch}
        />

        <EventFilter
          category={category}
          setCategory={handleCategory}
          sortBy={sort}
          setSortBy={handleSort}
          categories={categories}
        />
      </div>

      {/* Results information */}
      <div className="results-label">
        <span>
          {filteredEvents.length}{" "}
          {filteredEvents.length === 1 ? "event" : "events"}
        </span>

        <span>Campus events</span>
      </div>

      {/* Events */}
      {loading ? (
        <Loading />
      ) : paginatedEvents.length > 0 ? (
        <>
          <div className="events-grid">
            {paginatedEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block"
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="empty">
          <h2>No events found</h2>

          <p>Try a different search or category.</p>

          <button onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}



// export default function EventsPage() {
//   return <div>Events page is working</div>;
// }
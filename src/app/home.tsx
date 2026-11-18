


// "use client";

// import { useMemo, useState } from "react";
// import type { FormEvent, ReactNode } from "react";

// import type { Event, session } from "@/types/event";

// import Navbar from "@/components/layout/navbar";
// import Footer from "@/components/layout/footer";

// import SearchBar from "@/components/events/searchBar";
// import EventFilter from "@/components/events/eventFilters";
// import Loading from "@/components/events/loading";
// import Pagination from "@/components/events/pagination";

// import "@/app/globals.css";

// type View = "home" | "events" | "details" | "create";
// type SortOption = "Soonest" | "Latest";

// type EventCategory =
//   | "Culture"
//   | "Talks"
//   | "Community"
//   | "Career"
//   | "Music"
//   | "Workshop";

// type IconName =
//   | "arrow"
//   | "calendar"
//   | "check"
//   | "clock"
//   | "location"
//   | "plus"
//   | "search"
//   | "users";

// const categories = [
//   "All",
//   "Culture",
//   "Talks",
//   "Community",
//   "Career",
//   "Music",
//   "Workshop",
// ];

// const categoryImages: Record<EventCategory, string> = {
//   Culture:
//     "https://images.unsplash.com/photo-1526976668912-1a811878dd37?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
//   Talks:
//     "https://images.unsplash.com/photo-1667515385986-2d4263c4d3db?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
//   Community:
//     "https://images.unsplash.com/photo-1517457133997-cca417e4a561?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
//   Career:
//     "https://images.unsplash.com/photo-1547382002-b908c9367d83?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
//   Music:
//     "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
//   Workshop:
//     "https://images.unsplash.com/photo-1663162550974-aaf76bcdeedf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000&h=720",
// };

// const homeImage =
//   "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1200&h=1200";

// // Temporary frontend event data.
// const seedEvents: Event[] = [
//   {
//     id: 1,
//     title: "Campus Culture Fest",
//     category: "Culture",
//     description:
//       "An afternoon of music, food, dance, and stories celebrating the communities that make our campus feel like home.",
//     location: "The Green",
//     eventDate: new Date("2026-12-18T16:00:00").getTime(),
//     isPublished: true,
//   },
//   {
//     id: 2,
//     title: "Ideas After Dark",
//     category: "Talks",
//     description:
//       "Short, unexpected talks from students and faculty exploring the ideas that keep them curious.",
//     location: "Alumni Hall",
//     eventDate: new Date("2026-12-22T19:00:00").getTime(),
//     isPublished: true,
//   },
//   {
//     id: 3,
//     title: "Spring Club Fair",
//     category: "Community",
//     description:
//       "Meet student organizations, discover new interests, and find your people in one lively afternoon.",
//     location: "Library Plaza",
//     eventDate: new Date("2026-12-25T12:00:00").getTime(),
//     isPublished: true,
//   },
//   {
//     id: 4,
//     title: "Founders Meetup",
//     category: "Career",
//     description:
//       "A relaxed evening for student builders, founders, and anyone curious about turning an idea into something real.",
//     location: "Innovation Hub",
//     eventDate: new Date("2026-12-29T18:30:00").getTime(),
//     isPublished: true,
//   },
//   {
//     id: 5,
//     title: "Courtyard Sessions",
//     category: "Music",
//     description:
//       "Golden-hour performances from emerging campus artists in the Arts Courtyard.",
//     location: "Arts Courtyard",
//     eventDate: new Date("2027-01-02T17:00:00").getTime(),
//     isPublished: true,
//   },
//   {
//     id: 6,
//     title: "Design for Good",
//     category: "Workshop",
//     description:
//       "A collaborative workshop using design thinking to tackle a real challenge from our local community.",
//     location: "Design Studio",
//     eventDate: new Date("2027-01-06T15:00:00").getTime(),
//     isPublished: true,
//   },
// ];

// // Temporary session data.
// const eventSessions: session[] = [
//   {
//     id: 1,
//     eventId: 1,
//     startAt: new Date("2026-12-18T16:00:00").getTime(),
//     endAt: new Date("2026-12-18T17:00:00").getTime(),
//     room: "North Lawn",
//   },
//   {
//     id: 2,
//     eventId: 1,
//     startAt: new Date("2026-12-18T17:15:00").getTime(),
//     endAt: new Date("2026-12-18T18:15:00").getTime(),
//     room: "Garden Stage",
//   },
//   {
//     id: 3,
//     eventId: 1,
//     startAt: new Date("2026-12-18T18:30:00").getTime(),
//     endAt: new Date("2026-12-18T19:30:00").getTime(),
//     room: "Market Tent",
//   },
//   {
//     id: 4,
//     eventId: 1,
//     startAt: new Date("2026-12-18T20:00:00").getTime(),
//     endAt: new Date("2026-12-18T21:00:00").getTime(),
//     room: "Main Stage",
//   },
// ];

// type IconProps = {
//   name: IconName;
//   size?: number;
// };

// const paths: Record<IconName, ReactNode> = {
//   arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,

//   calendar: (
//     <>
//       <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
//       <path d="M8 2.5v4m8-4v4M3.5 9h17" />
//     </>
//   ),

//   check: <path d="m5 12 4 4L19 6" />,

//   clock: (
//     <>
//       <circle cx="12" cy="12" r="9" />
//       <path d="M12 7v5l3 2" />
//     </>
//   ),

//   location: (
//     <>
//       <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
//       <circle cx="12" cy="10" r="2.5" />
//     </>
//   ),

//   plus: <path d="M12 5v14M5 12h14" />,

//   search: (
//     <>
//       <circle cx="11" cy="11" r="7" />
//       <path d="m20 20-4-4" />
//     </>
//   ),

//   users: (
//     <>
//       <path d="M16 20v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" />
//       <circle cx="9" cy="8" r="4" />
//       <path d="M17 11a4 4 0 0 0 0-7m5 16v-1a4 4 0 0 0-3-3.8" />
//     </>
//   ),
// };

// function Icon({ name, size = 20 }: IconProps) {
//   return (
//     <svg
//       aria-hidden="true"
//       width={size}
//       height={size}
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       {paths[name]}
//     </svg>
//   );
// }

// function formatDate(timestamp: number) {
//   return new Date(timestamp).toLocaleDateString("en-US", {
//     month: "short",
//     day: "2-digit",
//   });
// }

// function formatFullDate(timestamp: number) {
//   return new Date(timestamp).toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// }

// function formatTime(timestamp: number) {
//   return new Date(timestamp).toLocaleTimeString("en-US", {
//     hour: "numeric",
//     minute: "2-digit",
//   });
// }

// function getEventImage(category: string) {
//   return (
//     categoryImages[category as EventCategory] ??
//     categoryImages.Community
//   );
// }

// export default function Home() {
//   const [view, setView] = useState<View>("home");

//   const [events, setEvents] = useState<Event[]>(seedEvents);

//   const [selectedId, setSelectedId] = useState<number>(1);

//   const [query, setQuery] = useState("");

//   const [category, setCategory] = useState("All");

//   const [sort, setSort] = useState<SortOption>("Soonest");

//   const [going, setGoing] = useState<number[]>([]);

//   const [created, setCreated] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 4;

//   const selected = events.find((event) => event.id === selectedId);

//   // Search, filter and sort events.
//   const filteredEvents = useMemo(() => {
//     const result = events.filter((event) => {
//       const matchesCategory =
//         category === "All" || event.category === category;

//       const searchText =
//         `${event.title} ${event.category} ${event.location}`.toLowerCase();

//       const matchesSearch = searchText.includes(query.toLowerCase());

//       return (
//         matchesCategory &&
//         matchesSearch &&
//         event.isPublished
//       );
//     });

//     return [...result].sort((a, b) => {
//       if (sort === "Latest") {
//         return b.eventDate - a.eventDate;
//       }

//       return a.eventDate - b.eventDate;
//     });
//   }, [events, query, category, sort]);

//   // Pagination.
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredEvents.length / itemsPerPage),
//   );

//   const paginatedEvents = filteredEvents.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   // Navigation between the four views.
//   const navigate = (next: View) => {
//     setView(next);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const openEvent = (id: number) => {
//     setSelectedId(id);
//     navigate("details");
//   };

//   const handleSearch = (value: string) => {
//     setQuery(value);
//     setCurrentPage(1);
//   };

//   const handleCategory = (value: string) => {
//     setCategory(value);
//     setCurrentPage(1);
//   };

//   const handleSort = (value: SortOption) => {
//     setSort(value);
//     setCurrentPage(1);
//   };

//   // Temporary local event creation.
//   const submitEvent = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const form = new FormData(event.currentTarget);

//     const title = String(form.get("title") || "");
//     const description = String(form.get("description") || "");
//     const categoryValue = String(
//       form.get("category") || "Community",
//     );
//     const location = String(form.get("location") || "");
//     const dateValue = String(form.get("date") || "");
//     const timeValue = String(form.get("time") || "16:00");

//     const eventDate = new Date(
//       `${dateValue}T${timeValue}`,
//     ).getTime();

//     if (
//       !title ||
//       !description ||
//       !location ||
//       !dateValue ||
//       Number.isNaN(eventDate)
//     ) {
//       return;
//     }

//     const newEvent: Event = {
//       id: Date.now(),
//       title,
//       description,
//       category: categoryValue,
//       location,
//       eventDate,
//       isPublished: true,
//     };

//     setLoading(true);

//     // Local frontend creation for now.
//     // API integration will be added later through eventServices.ts.
//     setEvents((current) => [newEvent, ...current]);

//     setCreated(true);

//     setCurrentPage(1);
//     setQuery("");
//     setCategory("All");
//     setSort("Soonest");

//     setLoading(false);

//     event.currentTarget.reset();

//     window.setTimeout(() => {
//       setCreated(false);
//       navigate("events");
//     }, 1000);
//   };

//   const nextEvent = [...events]
//     .filter((event) => event.isPublished)
//     .sort((a, b) => a.eventDate - b.eventDate)[0];

//   const selectedSessions = eventSessions.filter(
//     (item) => item.eventId === selectedId,
//   );

//   return (
//     <div className="app-shell">

//       {/* NAVBAR COMPONENT */}
//       <Navbar view={view} onNavigate={navigate} />

//       {/* HOME PAGE */}
//       {view === "home" && (
//         <main className="home">
//           <section className="home-hero">
//             <div className="home-copy">
//               <span className="eyebrow">
//                 Your campus, all in one place
//               </span>

//               <h1>
//                 There’s always
//                 <br />
//                 something <em>happening.</em>
//               </h1>

//               <p>
//                 Find talks, workshops, performances, and the people
//                 who make campus feel like yours.
//               </p>

//               <div className="hero-buttons">
//                 <button
//                   className="button primary"
//                   onClick={() => navigate("events")}
//                 >
//                   Explore events <Icon name="arrow" />
//                 </button>

//                 <button
//                   className="text-button"
//                   onClick={() => navigate("create")}
//                 >
//                   Host an event
//                 </button>
//               </div>
//             </div>

//             <div className="home-photo">
//               <img
//                 src={homeImage}
//                 alt="Students spending time together on campus"
//               />

//               {nextEvent && (
//                 <div className="next-up">
//                   <span className="date-chip">
//                     {new Date(nextEvent.eventDate).getDate()}
//                     <small>
//                       {new Date(nextEvent.eventDate)
//                         .toLocaleDateString("en-US", {
//                           month: "short",
//                         })
//                         .toUpperCase()}
//                     </small>
//                   </span>

//                   <div>
//                     <small>NEXT ON CAMPUS</small>
//                     <strong>{nextEvent.title}</strong>
//                     <p>
//                       {formatTime(nextEvent.eventDate)} ·{" "}
//                       {nextEvent.location}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>

//           <section className="home-strip">
//             <div>
//               <strong>{events.length}</strong>
//               <span>campus events</span>
//             </div>

//             <div>
//               <strong>{categories.length - 1}</strong>
//               <span>event categories</span>
//             </div>

//             <div>
//               <strong>1</strong>
//               <span>campus to explore</span>
//             </div>

//             <button onClick={() => navigate("events")}>
//               See what’s on <Icon name="arrow" />
//             </button>
//           </section>
//         </main>
//       )}

//       {/* EVENTS PAGE */}
//       {view === "events" && (
//         <main className="page events-page">
//           <div className="page-title">
//             <span className="eyebrow">DISCOVER CAMPUS</span>
//             <h1>Upcoming events</h1>
//             <p>Find something worth showing up for.</p>
//           </div>

//           <div className="event-tools">
//             <SearchBar
//               searchQuery={query}
//               setSearchQuery={handleSearch}
//             />

//             <EventFilter
//               category={category}
//               setCategory={handleCategory}
//               sortBy={sort}
//               setSortBy={handleSort}
//               categories={categories}
//             />
//           </div>

//           <div className="results-label">
//             <span>{filteredEvents.length} events</span>
//             <span>Campus events</span>
//           </div>

//           {loading ? (
//             <Loading />
//           ) : paginatedEvents.length > 0 ? (
//             <>
//               <div className="events-grid">
//                 {paginatedEvents.map((event) => (
//                   <article
//                     className="event-card"
//                     key={event.id}
//                     onClick={() => openEvent(event.id)}
//                   >
//                     <div className="event-image">
//                       <img
//                         src={getEventImage(event.category)}
//                         alt={event.title}
//                       />

//                       <span>{event.category}</span>
//                     </div>

//                     <div className="event-card-content">
//                       <div className="event-date">
//                         <strong>
//                           {new Date(event.eventDate).getDate()}
//                         </strong>

//                         <span>
//                           {new Date(event.eventDate)
//                             .toLocaleDateString("en-US", {
//                               month: "short",
//                             })
//                             .toUpperCase()}
//                         </span>
//                       </div>

//                       <div>
//                         <h2>{event.title}</h2>

//                         <p>
//                           <Icon name="clock" size={15} />{" "}
//                           {formatTime(event.eventDate)}
//                           <b> · </b>
//                           <Icon name="location" size={15} />{" "}
//                           {event.location}
//                         </p>

//                         <footer>
//                           <span>
//                             <Icon name="calendar" size={16} />
//                             {formatDate(event.eventDate)}
//                           </span>

//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               openEvent(event.id);
//                             }}
//                           >
//                             View event <Icon name="arrow" size={16} />
//                           </button>
//                         </footer>
//                       </div>
//                     </div>
//                   </article>
//                 ))}
//               </div>

//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//               />
//             </>
//           ) : (
//             <div className="empty">
//               <Icon name="search" size={28} />
//               <h2>No events found</h2>
//               <p>Try a different search or category.</p>

//               <button
//                 onClick={() => {
//                   setQuery("");
//                   setCategory("All");
//                   setCurrentPage(1);
//                 }}
//               >
//                 Clear filters
//               </button>
//             </div>
//           )}
//         </main>
//       )}

//       {/* EVENT DETAILS PAGE */}
//       {view === "details" && selected && (
//         <main className="page details-page">
//           <button
//             className="back"
//             onClick={() => navigate("events")}
//           >
//             ← Back to events
//           </button>

//           <div className="detail-hero">
//             <img
//               src={getEventImage(selected.category)}
//               alt={selected.title}
//             />

//             <div className="detail-summary">
//               <span className="eyebrow">{selected.category}</span>

//               <h1>{selected.title}</h1>

//               <p>{selected.description}</p>

//               <div className="detail-facts">
//                 <span>
//                   <Icon name="calendar" />
//                   <b>{formatFullDate(selected.eventDate)}</b>
//                 </span>

//                 <span>
//                   <Icon name="clock" />
//                   <b>{formatTime(selected.eventDate)}</b>
//                 </span>

//                 <span>
//                   <Icon name="location" />
//                   <b>{selected.location}</b>
//                 </span>
//               </div>

//               <button
//                 className={
//                   going.includes(selected.id)
//                     ? "button primary going"
//                     : "button primary"
//                 }
//                 onClick={() =>
//                   setGoing((current) =>
//                     current.includes(selected.id)
//                       ? current.filter((id) => id !== selected.id)
//                       : [...current, selected.id],
//                   )
//                 }
//               >
//                 <Icon
//                   name={
//                     going.includes(selected.id) ? "check" : "plus"
//                   }
//                 />

//                 {going.includes(selected.id)
//                   ? "You’re going"
//                   : "Join event"}
//               </button>
//             </div>
//           </div>

//           <section className="sessions-section">
//             <div className="section-intro">
//               <span className="eyebrow">EVENT PROGRAM</span>
//               <h2>Sessions</h2>
//               <p>
//                 Plan your time and explore everything happening
//                 throughout the event.
//               </p>
//             </div>

//             <div className="session-list">
//               {selectedSessions.length > 0 ? (
//                 selectedSessions.map((item, index) => (
//                   <article className="session" key={item.id}>
//                     <span className="session-number">
//                       {String(index + 1).padStart(2, "0")}
//                     </span>

//                     <time>{formatTime(item.startAt)}</time>

//                     <div>
//                       <h3>Event session {index + 1}</h3>
//                       <p>
//                         Ends at {formatTime(item.endAt)}
//                       </p>
//                     </div>

//                     <span className="session-place">
//                       <Icon name="location" size={16} />
//                       {item.room}
//                     </span>
//                   </article>
//                 ))
//               ) : (
//                 <div className="empty">
//                   <p>
//                     No session details are available for this event yet.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </section>
//         </main>
//       )}

//       {/* CREATE EVENT PAGE */}
//       {view === "create" && (
//         <main className="page create-page">
//           <div className="form-intro">
//             <span className="eyebrow">CREATE AN EVENT</span>

//             <h1>
//               Bring people
//               <br />
//               <em>together.</em>
//             </h1>

//             <p>
//               Share the essentials and make your event easy to
//               discover across campus.
//             </p>

//             <div className="form-note">
//               <Icon name="check" />

//               <span>
//                 <b>Before you publish</b>
//                 <small>
//                   Double-check the time, location, and event details.
//                 </small>
//               </span>
//             </div>
//           </div>

//           <form className="event-form" onSubmit={submitEvent}>
//             <div className="form-heading">
//               <span>Event details</span>
//               <small>All fields are required</small>
//             </div>

//             <label className="full">
//               Event name
//               <input
//                 name="title"
//                 required
//                 placeholder="e.g. Spring Film Night"
//               />
//             </label>

//             <label className="full">
//               Description
//               <textarea
//                 name="description"
//                 required
//                 rows={4}
//                 placeholder="Tell students what to expect..."
//               />
//             </label>

//             <label>
//               Category
//               <select
//                 name="category"
//                 required
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   Select category
//                 </option>

//                 {categories.slice(1).map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label>
//               Location
//               <input
//                 name="location"
//                 required
//                 placeholder="Building or space"
//               />
//             </label>

//             <label>
//               Date
//               <input name="date" type="date" required />
//             </label>

//             <label>
//               Start time
//               <input name="time" type="time" required />
//             </label>

//             <div className="form-actions full">
//               <button
//                 type="button"
//                 className="button secondary"
//                 onClick={() => navigate("home")}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="button primary"
//                 type="submit"
//                 disabled={loading}
//               >
//                 Publish event <Icon name="arrow" />
//               </button>
//             </div>
//           </form>

//           {created && (
//             <div className="toast">
//               <span>
//                 <Icon name="check" />
//               </span>

//               <div>
//                 <b>Event published</b>
//                 <small>Taking you to the events page…</small>
//               </div>
//             </div>
//           )}
//         </main>
//       )}

//       {/* FOOTER COMPONENT */}
//       <Footer onNavigate={navigate} />

//     </div>
//   );
// }




import Link from "next/link";



const homeImage =
  "https://images.unsplash.com/photo-1577985043696-8bd54d9f093f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=1200&h=1200";

export default function Home() {
  return (
    <div className="app-shell">
     

      <main className="home">
        <section className="home-hero">
          <div className="home-copy">
            <span className="eyebrow">
              Your campus, all in one place
            </span>

            <h1>
              There’s always
              <br />
              something <em>happening.</em>
            </h1>

            <p>
              Find talks, workshops, performances, and the people
              who make campus feel like yours.
            </p>

            <div className="hero-buttons">
              <Link href="/events" className="button primary">
                Explore events
                <span aria-hidden="true">→</span>
              </Link>

              <Link href="/events/create" className="text-button">
                Host an event
              </Link>
            </div>
          </div>

          <div className="home-photo">
            <img
              src={homeImage}
              alt="Students spending time together on campus"
            />

            <div className="next-up">
              <span className="date-chip">
                18
                <small>DEC</small>
              </span>

              <div>
                <small>NEXT ON CAMPUS</small>
                <strong>Campus Culture Fest</strong>
                <p>4:00 PM · The Green</p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-strip">
          <div>
            <strong>6</strong>
            <span>campus events</span>
          </div>

          <div>
            <strong>6</strong>
            <span>event categories</span>
          </div>

          <div>
            <strong>1</strong>
            <span>campus to explore</span>
          </div>

          <Link href="/events">
            See what’s on <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

     
    </div>
  );
}


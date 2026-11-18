




import type { Event } from "@/types/event";

export const seedEvents: Event[] = [
  {
    id: 1,
    title: "Campus Culture Fest",
    category: "Culture",
    description:
      "An afternoon of music, food, dance, and stories celebrating the communities that make our campus feel like home.",
    location: "The Green",
    eventDate: new Date("2026-12-18T16:00:00").getTime(),
    isPublished: true,
  },
  {
    id: 2,
    title: "Ideas After Dark",
    category: "Talks",
    description:
      "Short, unexpected talks from students and faculty exploring the ideas that keep them curious.",
    location: "Alumni Hall",
    eventDate: new Date("2026-12-22T19:00:00").getTime(),
    isPublished: true,
  },
  {
    id: 3,
    title: "Spring Club Fair",
    category: "Community",
    description:
      "Meet student organizations, discover new interests, and find your people in one lively afternoon.",
    location: "Library Plaza",
    eventDate: new Date("2026-12-25T12:00:00").getTime(),
    isPublished: true,
  },
  {
    id: 4,
    title: "Founders Meetup",
    category: "Career",
    description:
      "A relaxed evening for student builders, founders, and anyone curious about turning an idea into something real.",
    location: "Innovation Hub",
    eventDate: new Date("2026-12-29T18:30:00").getTime(),
    isPublished: true,
  },
  {
    id: 5,
    title: "Courtyard Sessions",
    category: "Music",
    description:
      "Golden-hour performances from emerging campus artists in the Arts Courtyard.",
    location: "Arts Courtyard",
    eventDate: new Date("2027-01-02T17:00:00").getTime(),
    isPublished: true,
  },
  {
    id: 6,
    title: "Design for Good",
    category: "Workshop",
    description:
      "A collaborative workshop using design thinking to tackle a real challenge from our local community.",
    location: "Design Studio",
    eventDate: new Date("2027-01-06T15:00:00").getTime(),
    isPublished: true,
  },
];

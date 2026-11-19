
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { createEvent } from "@/service/eventsService";

type CreateEventInput = Parameters<typeof createEvent>[0];

const categories: CreateEventInput["category"][] = [
  "Culture",
  "Talks",
  "Community",
  "Career",
  "Music",
  "Workshop",
];

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "" as CreateEventInput["category"] | "",
    isPublished: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!formData.category) {
      setError("Please select an event category.");
      return;
    }

    if (!formData.date || !formData.time) {
      setError("Please select an event date and time.");
      return;
    }

    // Combine the selected date and time
    const eventDate = new Date(
      `${formData.date}T${formData.time}:00`
    );

    // Validate the date
    if (Number.isNaN(eventDate.getTime())) {
      setError("Please enter a valid event date and time.");
      return;
    }

    // Ensure the event is in the future
    if (eventDate.getTime() <= Date.now()) {
      setError("Event date must be in the future.");
      return;
    }

    // Convert JavaScript Date to ISO 8601 string
    const isoEventDate = eventDate.toISOString();

    const payload: CreateEventInput = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
      category: formData.category,
      eventDate: isoEventDate,
      isPublished: formData.isPublished,
    };

    try {
      setLoading(true);

      // Debugging: inspect the exact data being sent
      console.log(
        "Payload being sent:",
        JSON.stringify(payload, null, 2)
      );

      console.log("Event date:", payload.eventDate);

      console.log(
        "Is valid date:",
        !Number.isNaN(Date.parse(payload.eventDate))
      );

      await createEvent(payload);

      setSuccess(true);

      setTimeout(() => {
        router.push("/events");
        router.refresh();
      }, 1000);

    } catch (err) {
      console.error("Create event error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create event. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page create-page">

      <div className="form-intro">
        <span className="eyebrow">CREATE AN EVENT</span>

        <h1>
          Bring people
          <br />
          <em>together.</em>
        </h1>

        <p>
          Share the essentials and make your event
          easy to discover across campus.
        </p>

        <div className="form-note">
          <span>✓</span>

          <span>
            <b>Before you publish</b>
            <small>
              Double-check the date, time, location,
              and event details.
            </small>
          </span>
        </div>
      </div>

      <form
        className="event-form"
        onSubmit={handleSubmit}
      >

        <div className="form-heading">
          <span>Event details</span>
          <small>All fields are required</small>
        </div>

        <label className="full">
          Event name

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Spring Film Night"
            required
            minLength={3}
          />
        </label>

        <label className="full">
          Description

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Tell students what to expect..."
            required
            minLength={10}
          />
        </label>

        <label>
          Category

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Location

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Building or space"
            required
          />
        </label>

        <label>
          Event date

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Start time

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>

        <label className="full">
          <span>Publication status</span>

          <select
            name="isPublished"
            value={String(formData.isPublished)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPublished: e.target.value === "true",
              }))
            }
          >
            <option value="true">Publish immediately</option>
            <option value="false">Save as draft</option>
          </select>
        </label>

        {error && (
          <p className="form-error full" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="form-success full" role="status">
            Event created successfully!
          </p>
        )}

        <div className="form-actions full">

          <Link
            href="/events"
            className="button secondary"
          >
            Cancel
          </Link>

          <button
            className="button primary"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create event →"}
          </button>

        </div>

      </form>
    </main>
  );
}

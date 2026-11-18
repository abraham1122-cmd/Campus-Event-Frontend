
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        {/* Brand */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            Gather<span className="text-indigo-400">.</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            Discover campus events, connect with your community, and never
            miss an opportunity to participate.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Quick Links</h3>

          <div className="flex flex-col items-start gap-3 text-sm">
            <Link href="/" className="hover:text-indigo-400">
              Home
            </Link>

            <Link href="/events" className="hover:text-indigo-400">
              Explore Events
            </Link>

            <Link href="/events/create" className="hover:text-indigo-400">
              Create Event
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Stay Connected</h3>

          <p className="text-sm leading-6 text-gray-400">
            Be part of the campus community. Discover events and connect
            with people who share your interests.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 px-6 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Gather. All rights reserved.
      </div>
    </footer>
  );
}

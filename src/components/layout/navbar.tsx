
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isEvents = pathname === "/events" || pathname.startsWith("/events/");
  const isCreate = pathname === "/events/create";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-indigo-600"
        >
          Gather<span className="text-gray-900">.</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={
              isHome
                ? "font-semibold text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            Home
          </Link>

          <Link
            href="/events"
            className={
              isEvents && !isCreate
                ? "font-semibold text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
            }
          >
            Explore Events
          </Link>

          <Link
            href="/events/create"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
          >
            Create Event
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-2xl text-gray-700 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-gray-200 bg-white px-6 py-5 md:hidden">
          <Link
            href="/"
            onClick={closeMenu}
            className={isHome ? "font-semibold text-indigo-600" : "text-gray-700"}
          >
            Home
          </Link>

          <Link
            href="/events"
            onClick={closeMenu}
            className={
              isEvents && !isCreate
                ? "font-semibold text-indigo-600"
                : "text-gray-700"
            }
          >
            Explore Events
          </Link>

          <Link
            href="/events/create"
            onClick={closeMenu}
            className="rounded-lg bg-indigo-600 px-4 py-3 text-white"
          >
            Create Event
          </Link>
        </div>
      )}
    </header>
  );
}

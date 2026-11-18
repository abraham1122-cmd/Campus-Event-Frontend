

"use client";

type sortOption = "Soonest" | "Latest";

interface EventFilterProps {
  category: string;
  setCategory: (value: string) => void;
  sortBy: sortOption;
  setSortBy: (value: sortOption) => void
  categories: string[];
}

export default function EventFilter({
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
}: EventFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-3"
      >
        <option value="All">All Categories</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as sortOption)}
        className="rounded-lg border border-gray-300 px-4 py-3"
      >
        <option value="Soonest">Soonest</option>
        <option value="Latest">Latest</option>
      </select>
    </div>
  );
}
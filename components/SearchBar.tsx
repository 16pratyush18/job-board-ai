"use client";

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="mt-8 flex flex-col items-stretch gap-3 px-6 md:flex-row md:items-center md:justify-center">
      <div className="w-full md:w-[32rem]">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          type="text"
          placeholder="Search jobs..."
          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card)]/70 px-4 py-3 text-gray-900 shadow-sm outline-none backdrop-blur transition focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
      </div>

      <button
        type="button"
        className="rounded-xl bg-blue-600 px-6 py-3 text-white shadow-sm transition hover:bg-blue-700 md:w-auto"
        onClick={() => {
          // intentionally no-op: filtering is live as you type.
        }}
      >
        Search
      </button>
    </div>
  );
}



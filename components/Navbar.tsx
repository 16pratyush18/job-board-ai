export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--card-border)] bg-[var(--card)]/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Job Board AI
        </h1>
        <span className="hidden text-sm text-gray-600 dark:text-gray-400 md:block">
          Search • Discover • Apply
        </span>
      </div>
    </nav>
  );
}

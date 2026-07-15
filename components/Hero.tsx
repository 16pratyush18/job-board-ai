export default function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-14 text-center md:py-20">
      <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/70 p-8 shadow-sm backdrop-blur">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Find Your Dream Job
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
          Discover thousands of roles from top companies. Search by title,
          location, salary, and keywords.
        </p>
      </div>
    </section>
  );
}


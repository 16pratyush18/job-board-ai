import Link from "next/link";

type JobCardProps = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
};

export default function JobCard({
  id,
  title,
  company,
  location,
  salary,
  description,
}: JobCardProps) {
  return (
    <article className="group rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/70 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
          {title}
        </h2>
      </div>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {company} • {location}
      </p>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          {salary}
        </span>

        <Link
          href={`/jobs/${id}`}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}


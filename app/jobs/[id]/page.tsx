import Link from "next/link";
import { notFound } from "next/navigation";
import jobs from "@/data/jobs";

type PageProps = {
  params: { id: string };
};

export default function JobDetailsPage({ params }: PageProps) {
  const id = Number(params.id);
  const job = jobs.find((j) => j.id === id);

  if (!job) return notFound();

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-flex text-blue-700 hover:underline"
        >
          ← Back to search
        </Link>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md">
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-3 text-gray-600">
            {job.company} • {job.location}
          </p>

          <div className="mt-6">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {job.salary}
            </span>
          </div>

          <h2 className="mt-8 text-xl font-semibold text-gray-900">About</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">{job.description}</p>
        </div>
      </div>
    </main>
  );
}


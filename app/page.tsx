"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import jobs from "@/data/jobs";
import ResumeMatcher from "@/components/ResumeMatcher";


export default function Home() {
  const [query, setQuery] = useState<string>("");

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter((job) => {
      const haystack = [
        job.title,
        job.company,
        job.location,
        job.salary,
        job.description,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100">
        <Hero />
        <ResumeMatcher />
        <SearchBar query={query} onQueryChange={setQuery} />

        <section className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">

          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              description={job.description}
            />
          ))}
        </section>

        {filteredJobs.length === 0 ? (
          <p className="mx-auto mt-10 max-w-6xl px-6 pb-16 text-gray-600">
            No jobs match “{query}”.
          </p>
        ) : null}
      </main>
    </>
  );
}


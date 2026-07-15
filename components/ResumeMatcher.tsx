"use client";

import { useMemo, useState } from "react";
import Link from "next/link";


type MatchResult = {
  jobId: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  matchedKeywords: string[];
};

export default function ResumeMatcher() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchResult[] | null>(null);
  const [resumeLength, setResumeLength] = useState<number | null>(null);

  const canSubmit = useMemo(() => {
    if (!file) return false;
    const name = file.name.toLowerCase();
    return name.endsWith(".pdf") || name.endsWith(".docx");
  }, [file]);

  async function onSubmit() {
    if (!file) return;
    setError(null);
    setIsLoading(true);
    setMatches(null);
    setResumeLength(null);

    try {
      const form = new FormData();
      form.append("resume", file);

      const res = await fetch("/api/match-resume", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setMatches(data.matches);
      setResumeLength(data.resumeLength);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : undefined;
      setError(message || "Something went wrong");
    } finally {

      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-6xl px-6 pb-16">
      <div className="rounded-2xl border border-[var(--card-border)] bg-white/60 p-6 shadow-sm backdrop-blur md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Resume → Job Match
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Upload your resume (PDF or DOCX). We’ll extract the text and rank matching jobs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="cursor-pointer rounded-xl border border-[var(--card-border)] bg-[var(--card)]/70 px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-[var(--card)] dark:text-white">
              Choose file
              <input
                className="hidden"
                type="file"
                accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <button
              type="button"
              disabled={!canSubmit || isLoading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={onSubmit}
            >
              {isLoading ? "Matching..." : "Match"}
            </button>
          </div>
        </div>

        {file ? (
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
            Selected: <span className="font-semibold">{file.name}</span>
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {matches ? (
          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Top matches
              </h3>
              {resumeLength !== null ? (
                <span className="text-xs text-gray-600 dark:text-gray-300">
                  Resume text length: {resumeLength}
                </span>
              ) : null}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {matches.map((m) => (
                <article
                  key={m.jobId}
                  className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)]/70 p-5 shadow-sm transition hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white">
                        {m.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {m.company} • {m.location}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-700 dark:text-blue-300">
                        {m.matchScore}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Match</div>
                    </div>
                  </div>

                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${m.matchScore}%` }}
                    />
                  </div>

                  {m.matchedKeywords.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.matchedKeywords.slice(0, 6).map((kw) => (
                        <span
                          key={kw}
                          className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 text-xs text-gray-600 dark:text-gray-300">
                      No strong keyword overlaps found.
                    </div>
                  )}

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {m.salary}
                    </span>
                    <Link
                      href={`/jobs/${m.jobId}`}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


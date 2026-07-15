import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import formidable from "formidable";
import jobs from "@/data/jobs";


type PdfParseFn = (input: Buffer) => Promise<{ text?: string }>;

// Lazy-load pdf-parse to avoid breaking Turbopack/module graph and to keep ESLint happy.
let pdfParseFn: PdfParseFn | null = null;
async function getPdfParseFn(): Promise<PdfParseFn | null> {
  if (pdfParseFn) return pdfParseFn;
  try {
    const mod = await import("pdf-parse");
    pdfParseFn = (mod as unknown as PdfParseFn);

    return pdfParseFn;
  } catch {
    pdfParseFn = null;
    return null;
  }
}




type MatchResult = {
  jobId: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number; // 0..100
  matchedKeywords: string[];
};

type ParsedFile = {
  filepath: string;
  originalFilename?: string;
  mimetype?: string;
};

type ParsedFormResult = {
  files: {
    resume?: ParsedFile | ParsedFile[];
  };
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => t.length >= 3);
}

function computeMatchScore(
  resumeText: string,
  jobDescription: string
): { score: number; keywords: string[] } {
  const resumeTokens = new Set(tokenize(resumeText));
  const jobTokens = tokenize(jobDescription);

  const stopwords = new Set<string>([
    "with",
    "and",
    "for",
    "the",
    "you",
    "are",
    "our",
    "will",
    "have",
    "from",
    "this",
    "that",
    "into",
    "your",
    "work",
    "role",
    "job",
    "responsibilities",
    "requirements",
    "skills",
    "experience",
  ]);

  const keywordCandidates = Array.from(
    new Set(jobTokens.filter((t) => !stopwords.has(t) && t.length >= 3))
  );

  let matched = 0;
  const matchedKeywords: string[] = [];

  for (const kw of keywordCandidates) {
    if (resumeTokens.has(kw)) {
      matched += 1;
      matchedKeywords.push(kw);
    }
  }

  const denom = Math.max(1, keywordCandidates.length);
  const raw = matched / denom;

  const lengthBoost = Math.min(
    1.15,
    Math.log10(Math.max(100, resumeText.length)) / 3
  );

  const score = Math.round(raw * 100 * lengthBoost);

  return {
    score: Math.max(0, Math.min(100, score)),
    keywords: matchedKeywords.slice(0, 12),
  };
}

function parseForm(req: NextRequest): Promise<ParsedFile[]> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowEmptyFiles: false,
      uploadDir: os.tmpdir(),
      keepExtensions: true,
    });

// formidable expects Node IncomingMessage; NextRequest is a web ReadableStream.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.parse(req as any, (err, _fields, files) => {
      if (err) return reject(err);

      const resume = (files as unknown as ParsedFormResult["files"]["resume"]) ?? undefined;
      if (!resume) return resolve([]);

      const file = Array.isArray(resume) ? resume[0] : resume;

      if (!file?.filepath) return resolve([]);

      resolve([
        {
          filepath: file.filepath,
          originalFilename: file.originalFilename,
          mimetype: file.mimetype,
        },
      ]);
    });
  });
}

async function extractTextFromFile(filePath: string, mimeType?: string) {
  const buf = await fs.readFile(filePath);

  const lowerPath = filePath.toLowerCase();

  if (mimeType?.includes("pdf") || lowerPath.endsWith(".pdf")) {
    const parseFn = await getPdfParseFn();
    if (!parseFn) return "";

    const data = await parseFn(buf);
    return (data.text ?? "").toString();
  }


  if (mimeType?.includes("word") || lowerPath.endsWith(".docx")) {
    const mod = await import("mammoth");
    const result = await mod.extractRawText({ buffer: buf });
    return (result.value ?? "").toString();
  }


  return "";
}

export async function POST(req: NextRequest) {
  let uploaded: ParsedFile[] = [];
  let filePathToDelete: string | null = null;

  try {
    uploaded = await parseForm(req);
    if (!uploaded.length) {
      return NextResponse.json(
        { error: "No file uploaded (expected field name: resume)" },
        { status: 400 }
      );
    }

    const { filepath, mimetype } = uploaded[0];
    filePathToDelete = filepath;

    const resumeText = await extractTextFromFile(filepath, mimetype);
    if (!resumeText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from the resume" },
        { status: 422 }
      );
    }

    const matches: MatchResult[] = jobs
      .map((job) => {
        const { score, keywords } = computeMatchScore(
          resumeText,
          job.description
        );

        return {
          jobId: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          matchScore: score,
          matchedKeywords: keywords,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 8);

    return NextResponse.json({
      resumeLength: resumeText.length,
      matches,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Match failed" }, { status: 500 });

  } finally {
    if (filePathToDelete) {
      try {
        await fs.unlink(filePathToDelete);
      } catch {
        // ignore
      }
    }
  }
}


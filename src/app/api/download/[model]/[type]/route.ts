import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE_DIR = path.join(process.cwd(), "public", "docs");

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchModelFile(model: string, filename: string) {
  const baseName = path.basename(filename);
  const normalized = normalize(baseName);
  const nameWithoutExt = normalized.endsWith("pdf") ? normalized.slice(0, -3) : normalized;
  return nameWithoutExt.startsWith(normalize(model));
}

function classifyFile(filename: string): "datasheet" | "manual" | null {
  const lower = filename.toLowerCase();
  if (lower.includes("user manual") || lower.includes("manual") || lower.includes("user-manual")) {
    return "manual";
  }
  if (filename.toLowerCase().endsWith(".pdf")) {
    return "datasheet";
  }
  return null;
}

function findPdfFiles(dir: string): string[] {
  let results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findPdfFiles(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".pdf")) {
      results.push(fullPath);
    }
  }
  return results;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string; type: string }> }
) {
  const { model, type } = await params;

  if (!fs.existsSync(BASE_DIR)) {
    return NextResponse.json({ error: "Document library unavailable" }, { status: 503 });
  }

  const allPdfs = findPdfFiles(BASE_DIR);
  const matched = allPdfs.filter((f) => matchModelFile(model, f));

  const preferred = matched.find((f) => classifyFile(path.basename(f)) === type) ?? matched.find((f) => classifyFile(path.basename(f)) !== null);

  if (!preferred) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const stream = fs.createReadStream(preferred);
  const stat = fs.statSync(preferred);

  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${path.basename(preferred)}"`,
      "Content-Length": stat.size.toString(),
      "Cache-Control": "no-store",
    },
  });
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ model: string; type: string }> }
) {
  const { model, type } = await params;

  if (!fs.existsSync(BASE_DIR)) {
    return new NextResponse(null, { status: 503 });
  }

  const allPdfs = findPdfFiles(BASE_DIR);
  const matched = allPdfs.filter((f) => matchModelFile(model, f));

  const preferred = matched.find((f) => classifyFile(path.basename(f)) === type) ?? matched.find((f) => classifyFile(path.basename(f)) !== null);

  if (!preferred) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(null, { status: 200 });
}

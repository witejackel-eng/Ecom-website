import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE_DIR = path.join(process.cwd(), "public", "docs");

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchModelFile(model: string, filename: string) {
  const baseName = path.basename(filename);
  const nameWithoutExt = normalize(baseName).replace(/\.pdf$/i, "");
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
  { params }: { params: Promise<{ model: string }> }
) {
  const { model } = await params;

  if (!fs.existsSync(BASE_DIR)) {
    return NextResponse.json({ datasheet: false, manual: false }, { status: 200 });
  }

  const allPdfs = findPdfFiles(BASE_DIR);
  const matched = allPdfs.filter((f) => matchModelFile(model, f));

  const result = { datasheet: false, manual: false } as { datasheet: boolean; manual: boolean };
  for (const file of matched) {
    const kind = classifyFile(path.basename(file));
    if (kind === "datasheet") result.datasheet = true;
    if (kind === "manual") result.manual = true;
  }

  return NextResponse.json(result, { status: 200 });
}

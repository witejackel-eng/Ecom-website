import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE_DIR = "D:\\Ecommerce\\CCTV\\images for ecom";

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchModelFile(model: string, filename: string) {
  const nameWithoutExt = normalize(filename).replace("\.pdf$", "");
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  const { model } = await params;

  if (!fs.existsSync(BASE_DIR)) {
    return NextResponse.json({ datasheet: false, manual: false }, { status: 200 });
  }

  const files = fs.readdirSync(BASE_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  const matched = files.filter((f) => matchModelFile(model, f));

  const result = { datasheet: false, manual: false } as { datasheet: boolean; manual: boolean };
  for (const file of matched) {
    const kind = classifyFile(file);
    if (kind === "datasheet") result.datasheet = true;
    if (kind === "manual") result.manual = true;
  }

  return NextResponse.json(result, { status: 200 });
}
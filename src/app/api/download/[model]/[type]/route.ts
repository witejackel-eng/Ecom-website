import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BASE_DIR = path.join(process.cwd(), "public", "docs");

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
  { params }: { params: Promise<{ model: string; type: string }> }
) {
  const { model, type } = await params;

  if (!fs.existsSync(BASE_DIR)) {
    return NextResponse.json({ error: "Document library unavailable" }, { status: 503 });
  }

  const files = fs.readdirSync(BASE_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  const match = files.find((f) => matchModelFile(model, f));

  if (!match) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const filepath = path.join(BASE_DIR, match);
  const stream = fs.createReadStream(filepath);
  const stat = fs.statSync(filepath);

  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${match}"`,
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

  const files = fs.readdirSync(BASE_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  const match = files.find((f) => matchModelFile(model, f));

  if (!match) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(null, { status: 200 });
}



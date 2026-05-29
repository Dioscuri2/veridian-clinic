import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

const GUIDE_MAP: Record<string, { file: string; displayName: string }> = {
  guide: { file: "metabolic-reset-guide.pdf", displayName: "Veridian-Metabolic-Reset-Guide.pdf" },
  "peri-guide": { file: "perimenopause-guide.pdf", displayName: "Veridian-Perimenopause-Reset-Guide.pdf" },
};

export async function GET(request: NextRequest) {
  const tier = request.nextUrl.searchParams.get("tier") || "guide";
  const guideInfo = GUIDE_MAP[tier];

  if (!guideInfo) {
    return new NextResponse("Invalid guide", { status: 400 });
  }

  try {
    const pdfPath = path.join(process.cwd(), "private", "guides", guideInfo.file);
    const pdfBuffer = readFileSync(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${guideInfo.displayName}"`,
        "Content-Length": String(pdfBuffer.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Guide file not found", { status: 500 });
  }
}

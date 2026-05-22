import { NextResponse } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "private", "guides", "perimenopause-guide.pdf");
    const pdfBuffer = readFileSync(pdfPath);
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Veridian-Perimenopause-Reset-Guide.pdf"',
        "Content-Length": String(pdfBuffer.byteLength),
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse("Guide not found.", { status: 500 });
  }
}

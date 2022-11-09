import { NextRequest, NextResponse } from "next/server";

function getXlugData(xlug?: string): null | { url: string } {
  return null;
}

export async function middleware(req: NextRequest) {
  const xlug = req.nextUrl.pathname.split("/").pop();
  const xlugData = getXlugData(xlug);

  if (!xlugData) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  if (xlugData.url) {
    return NextResponse.redirect(new URL(xlugData.url));
  }
}

export const config = {
  matcher: "/x/:xlug*",
};

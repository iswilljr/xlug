import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const xlug = req.nextUrl.pathname.split("/").pop();
  const data = await fetch(`${req.nextUrl.origin}/api/xlug?xlug=${xlug ?? ""}`);

  if (!data.ok) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const xlugData = await data.json();
  console.log(data.ok, xlugData);

  if (data?.url) {
    return NextResponse.redirect(new URL(xlugData.xlug.destination));
  }
}

export const config = {
  matcher: "/x/:xlug*",
};

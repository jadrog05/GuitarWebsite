// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/callback'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_ROUTES.some((route) =>
    pathname === route
  );

  if (!isPublic) {
    //return NextResponse.redirect(new URL('/auth/login', request.url));

  }

  return await auth0.middleware(request);
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

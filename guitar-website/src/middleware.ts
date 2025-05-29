// src/middleware.ts
import { type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

//const PUBLIC_ROUTES = ['/', '/auth/login', '/auth/callback'];

export async function middleware(request: NextRequest) {

  return await auth0.middleware(request);
}


export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

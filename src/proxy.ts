import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url, 308);
  }
  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};

import { NextResponse, type NextRequest } from "next/server";

const DEFAULT_REDIRECT_HOSTS = ["pawpeaceguide.vercel.app", "www.pawpeaceguide.com"];

export function middleware(request: NextRequest) {
  if (process.env.CANONICAL_HOST_REDIRECT_ENABLED !== "true") {
    return NextResponse.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    return NextResponse.next();
  }

  let canonicalUrl: URL;

  try {
    canonicalUrl = new URL(siteUrl);
  } catch {
    return NextResponse.next();
  }

  const requestHost = request.headers.get("host")?.split(":")[0];
  if (!requestHost || requestHost === canonicalUrl.host) {
    return NextResponse.next();
  }

  const redirectHosts = (process.env.CANONICAL_REDIRECT_HOSTS || DEFAULT_REDIRECT_HOSTS.join(","))
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);

  if (!redirectHosts.includes(requestHost.toLowerCase())) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.protocol = canonicalUrl.protocol;
  destination.hostname = canonicalUrl.hostname;
  destination.port = canonicalUrl.port;

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)"]
};

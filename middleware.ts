import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "./lib/auth"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value

  // Public routes that don't need authentication
  const publicRoutes = ["/", "/api/auth/callback", "/api/auth/logout"]

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Check if token exists
  if (!token) {
    // Redirect to login for protected routes
    if (request.nextUrl.pathname.startsWith("/dashboard") || 
        request.nextUrl.pathname.startsWith("/(main)")) {
      return NextResponse.redirect(new URL("/", request.url))
    }
    return NextResponse.next()
  }

  // Verify token validity
  try {
    const user = await verifyToken(token)
    if (!user && (request.nextUrl.pathname.startsWith("/dashboard") || 
                   request.nextUrl.pathname.startsWith("/(main)"))) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  } catch (error) {
    console.error("Token verification error:", error)
    if (request.nextUrl.pathname.startsWith("/dashboard") || 
        request.nextUrl.pathname.startsWith("/(main)")) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

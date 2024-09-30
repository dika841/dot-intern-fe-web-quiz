import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  const isLoginPage = pathname.startsWith("/auth/login");
  const protectedRoutes = ["/playground"];
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isLoginPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/playground", req.url));
    }
    return NextResponse.next();
  }

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (pathname === "/") {
    if (isAuth) {
      return NextResponse.redirect(new URL("/playground", req.url));
    } else {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/playground/:path*"],
};

import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
  const session = await getToken({ req });
  const url = req.nextUrl;
  const loginUrl = new URL('/auth/login', url.origin);
  const playgroundUrl = new URL('/playground', url.origin);
  if (url.pathname.startsWith('/playground') && !session) {
    return NextResponse.redirect(loginUrl);
  }
  if (url.pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(playgroundUrl);
  }

  return NextResponse.next();
}
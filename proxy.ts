import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/challenges', '/experiences'];
const publicRoutes = ['/login', '/register'];

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get('token')?.value;

  if (path === '/') {
    return NextResponse.redirect(new URL(token ? '/dashboard' : '/login', req.nextUrl));
  }

  const isProtected = protectedRoutes.some((r) => path.startsWith(r));
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  const isPublic = publicRoutes.some((r) => path.startsWith(r));
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

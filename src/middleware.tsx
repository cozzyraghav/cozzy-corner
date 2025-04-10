import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  if (process.env.ENVIROMENT === 'development') {
    return NextResponse.next();
  }
  const cookie = request.cookies.get('hash');
  if (cookie?.value === process.env.ADMIN_HASH) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

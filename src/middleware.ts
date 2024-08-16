import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  // Access the cookies
  const roleCookie = cookies().get('role');
  const role = roleCookie ? roleCookie.value : undefined;

  console.log("Role from cookie:", role);

  // Check if the request is to a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (role !== 'busowner') {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

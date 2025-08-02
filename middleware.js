import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/secret-admin-path')
  const token = request.cookies.get('admin_token')?.value

  if (isAdminRoute && token !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/secret-admin-path/:path*'],
}

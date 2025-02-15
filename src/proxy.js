import { NextResponse } from 'next/server';
import { setTokenCookie } from '@/lib/auth';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;
const SSO_VERIFY_URL = process.env.NEXT_PUBLIC_SSO_VERIFY_URL;
const SSO_TOKEN_COOKIE = process.env.NEXT_PUBLIC_SSO_TOKEN_COOKIE;

export async function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const fullUrl = SITE_URL + pathname + search;

  const loginUrl = new URL(LOGIN_URL);
  loginUrl.searchParams.set('redirect', fullUrl);
  
  const cookieToken = request.cookies.get(SSO_TOKEN_COOKIE)?.value;
  const urlToken = request.nextUrl.searchParams.get('token');

  if (urlToken) {
    try {
      const verifyResponse = await fetch(SSO_VERIFY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: urlToken }),
      });
      
      if (verifyResponse.status == 200) {
        const json = await verifyResponse.json();

        const dataBlock = json?.payload ?? json?.data ?? json;
        const roles = Array.isArray(dataBlock?.roles) ? dataBlock.roles : [];
        const hasRequiredRole = roles.includes('ADMIN') || roles.includes('RELATIVE') || roles.includes('TRUSTED');

        if (!hasRequiredRole) {
          return new NextResponse('Forbidden', { status: 403 });
        }

        const response = NextResponse.redirect(new URL(pathname, SITE_URL));
        setTokenCookie(response, urlToken);

        return response;
      } else {
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete(SSO_TOKEN_COOKIE);
        return response;
      }
    } catch (error) {
      return NextResponse.redirect(loginUrl);
    }
  }
  
  if (!cookieToken) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const verifyResponse = await fetch(SSO_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: cookieToken }),
    });
    
    if (!verifyResponse.ok) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SSO_TOKEN_COOKIE);
      return response;
    }

    return NextResponse.next();
    
  } catch (error) {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
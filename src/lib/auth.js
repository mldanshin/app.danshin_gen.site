import { cookies } from 'next/headers';

const SSO_TOKEN_COOKIE = process.env.NEXT_PUBLIC_SSO_TOKEN_COOKIE;

export async function getServerToken() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(SSO_TOKEN_COOKIE)?.value || null;
  } catch (error) {
    return null;
  }
}

export function setTokenCookie(response, token) {
  response.cookies.set(SSO_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax'
  });
}

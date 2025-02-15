import { cookies } from 'next/headers';

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export async function getAccessToken() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || null;
  } catch (error) {
    return null;
  }
}

export async function getRefreshToken() {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || null;
  } catch (error) {
    return null;
  }
}

export async function setAccessTokenCookie(response, token) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60,
    path: '/',
    sameSite: 'lax'
  });
}

export async function setRefreshTokenCookie(response, token) {
  response.cookies.set(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax'
  });
}

export async function deleteAccessTokenCookie(response) {
  response.cookies.set(ACCESS_TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: true,
    maxAge: -1,
    path: '/',
    sameSite: 'lax'
  });
}

export async function deleteRefreshTokenCookie(response) {
  response.cookies.set(REFRESH_TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: true,
    maxAge: -1,
    path: '/',
    sameSite: 'lax'
  });
}

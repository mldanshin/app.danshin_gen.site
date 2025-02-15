import { getUserDataFromToken, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, verifyUser } from '@/lib/tokens';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@/lib/cookies';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL;

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

const loginUrl = new URL(LOGIN_URL);

export async function auth(request) {
    let accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
    const urlToken = request.nextUrl.searchParams.get('token');
    const { pathname, search } = request.nextUrl;
    loginUrl.searchParams.set('redirect', SITE_URL + pathname + search);
    let isAuth = false;

    try {
        if (urlToken) {
            const isValidAccessToken = await verifyUser(urlToken);
            if (!isValidAccessToken) {
                return responseRedirectLogin();
            };

            const response = NextResponse.redirect(new URL(pathname, SITE_URL));
            const userData = getUserDataFromToken(urlToken);
            setAccessTokenCookie(response, generateAccessToken(userData));
            setRefreshTokenCookie(response, generateRefreshToken(userData));
            return response;
        }

        if (accessToken) {
            const isValidAccessToken = verifyAccessToken(accessToken);
            if (isValidAccessToken) {
                isAuth = true;
            }
        }

        if (!isAuth) {
            const isValidRefreshToken = verifyRefreshToken(refreshToken);
            if (isValidRefreshToken) {
                const isValidUser = await verifyUser(refreshToken);
                if (isValidUser) {
                    const userData = getUserDataFromToken(refreshToken);
                    accessToken = generateAccessToken(userData);
                    isAuth = true;

                    if (!hasRequiredRole(userData.roles)) {
                        return response403(userData);
                    }

                    const response = NextResponse.next();
                    setAccessTokenCookie(response, accessToken);
                    return response;
                } else {
                    return responseRedirectLogin();
                }
            } else {
                return responseRedirectLogin();
            }
        }

        if (isAuth) {
            const userData = getUserDataFromToken(refreshToken);
            if (!hasRequiredRole(userData.roles)) {
                return response403(userData);
            }

            return NextResponse.next();
        }
    } catch (error) {
        return responseRedirectLogin();
    }
}

function hasRequiredRole(roles) {
    return roles.includes('ADMIN') || roles.includes('RELATIVE') || roles.includes('TRUSTED');
}

function responseRedirectLogin() {
    return NextResponse.redirect(loginUrl);
}

function response403() {
    return new NextResponse('Forbidden', { status: 403 });
}

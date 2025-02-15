import { NextResponse } from 'next/server';
import { getAccessToken, deleteAccessTokenCookie, deleteRefreshTokenCookie } from '@/lib/cookies';

export async function POST() {
    try {
        const token = await getAccessToken();

        if (!token) {
            const response = NextResponse.json(
                { message: 'No token found, cookies cleared' },
                { status: 200 }
            );
            deleteAccessTokenCookie(response);
            deleteRefreshTokenCookie(response);

            return response;
        }

        const logoutUrl = new URL(process.env.NEXT_PUBLIC_LOGOUT_URL);
        const response = await fetch(logoutUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token
            })
        });

        if (response.ok) {
            const nextResponse = NextResponse.json(
                { message: 'Logged out successfully' },
                { status: 200 }
            );

            deleteAccessTokenCookie(nextResponse);
            deleteRefreshTokenCookie(nextResponse);

            return nextResponse;
        } else {
            return NextResponse.json(
                { message: 'Logout error' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.log('Logout error:', error);
        return NextResponse.json(
            { message: 'Logout failed' },
            { status: 500 }
        );
    }
}
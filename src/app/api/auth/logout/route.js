import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const SSO_TOKEN_COOKIE = process.env.NEXT_PUBLIC_SSO_TOKEN_COOKIE;
        const cookieStore = await cookies();
        const token = cookieStore.get(SSO_TOKEN_COOKIE)?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Token not found' },
                { status: 401 }
            );
        }

        const logoutUrl = new URL(process.env.NEXT_PUBLIC_SSO_LOGOUT_URL);
        logoutUrl.searchParams.append('token', token);

        const response = await fetch(logoutUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}
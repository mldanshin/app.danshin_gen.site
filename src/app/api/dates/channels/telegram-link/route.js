import { getAccessToken } from '@/lib/cookies';
import { getTelegramLink } from '@/services/channels';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const token = await getAccessToken();

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized",
                type: 'error'
            }, { status: 401 });
        }

        const response = await getTelegramLink(token);
        if (response && response.ok) {
            const link = await response.text();
            return NextResponse.json({ link }, { status: 200 });
        } else {
            return NextResponse.json({
                message: "Server Error",
                type: 'error'
            }, { status: 500 });
        }
    } catch (error) {
        console.log('Server Error', error);
        return NextResponse.json({
            message: "Server Error",
            type: 'error'
        }, { status: 500 });
    }
}

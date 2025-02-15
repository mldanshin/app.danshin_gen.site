import { getAccessToken } from '@/lib/cookies';
import { NextResponse } from 'next/server';
import { verifyEmailByLink } from '@/services/channels';

export async function POST(request) {
    try {
        const tokenUser = await getAccessToken();

        if (!tokenUser) {
            return NextResponse.json({
                message: "Unauthorized",
                type: 'error'
            }, { status: 401 });
        }

        const body = await request.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json({
                message: "Bad Reauest",
                type: 'error'
            }, { status: 400 });
        }

        const response = await verifyEmailByLink(tokenUser, token);
        if (response && response.ok) {
            return NextResponse.json({
                message: "Ok",
                type: 'success'
            }, { status: 200 });
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

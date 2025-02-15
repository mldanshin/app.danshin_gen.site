import { requestEmailVerification } from '@/services/channels';
import { getAccessToken } from '@/lib/cookies';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const token = await getAccessToken();

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized",
                type: 'error'
            }, { status: 401 });
        }

        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({
                message: "Bad Reauest",
                type: 'error'
            }, { status: 400 });
        }

        const response = await requestEmailVerification(token, email);
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

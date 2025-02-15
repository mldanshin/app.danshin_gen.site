import { deleteTelegram } from '@/services/channels';
import { getAccessToken } from '@/lib/cookies';
import locale from '@/locales/ru/dates/channel.json';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        const token = await getAccessToken();

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized",
                type: 'error'
            }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('chatId');

        if (!email) {
            return NextResponse.json({
                message: locale.telegram.required,
                type: 'error'
            }, { status: 400 });
        }

        const response = await deleteTelegram(token, email);
        if (response && response.status == 204) {
            return NextResponse.json({ 
                message: locale.telegram.delete.ok,
                type: 'success'
            }, { status: 200 });
        } else {
            return NextResponse.json({
                message: locale.telegram.delete.error,
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

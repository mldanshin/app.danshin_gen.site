import { getChannels } from '@/services/channels';
import { getServerToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const token = await getServerToken();

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized",
                type: 'error'
            }, { status: 401 });
        }

        const response = await getChannels(token);

        if (!response || response.status === 404) {
            return NextResponse.json(null, { status: 404 });
        }
        
        if (!response.ok) {
            return NextResponse.json(null, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log('Server Error', error);
        return NextResponse.json({
            message: "Server Error",
            type: 'error'
        }, { status: 500 });
    }
}

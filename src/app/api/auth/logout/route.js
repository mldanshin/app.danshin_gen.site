import { NextResponse } from 'next/server';

export async function GET(request) {
    const response = NextResponse.json({ message: 'Cookie delete successfully' });
    response.cookies.delete('session');
    return response;
}

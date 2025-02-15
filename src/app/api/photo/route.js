import { getAccessToken } from '@/lib/cookies';
import { getPhotoData } from "@/services/photo.js";

export async function GET(request) {
    const token = await getAccessToken();
    const url = new URL(request.url);
    const personId = url.searchParams.get("personId");
    const fileName = url.searchParams.get("fileName");

    if (!personId || !fileName) {
        return new Response(
            JSON.stringify({ error: 'Missing personId or fileName' }),
            { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' } 
            }
        );
    }

    const response = await getPhotoData(personId, fileName, token);
    if (response == null) {
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return response;
}
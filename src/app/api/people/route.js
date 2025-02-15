import { getPeople } from "@/services/people";
import { getAccessToken } from '@/lib/cookies';

export async function GET(request) {
    const url = new URL(request.url);
    const order = url.searchParams.get("order");
    const search = url.searchParams.get("search");
    const token = await getAccessToken();

    const people = await getPeople(order, search, token);
    
    if (people === null) {
        return new Response(JSON.stringify({ message: 'Server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return new Response(JSON.stringify(people), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

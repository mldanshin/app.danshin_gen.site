import { getPeople } from "@/services/people";
import { getServerToken } from '@/lib/auth';

export async function GET(request) {
    const url = new URL(request.url);
    const order = url.searchParams.get("order");
    const search = url.searchParams.get("search");
    const token = await getServerToken();

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

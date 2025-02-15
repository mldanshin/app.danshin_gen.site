import { getPerson } from "@/services/download";
import { getAccessToken } from '@/lib/cookies';

export async function GET(request) {
    const token = await getAccessToken();
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");

    return getPerson(personId, token);
}

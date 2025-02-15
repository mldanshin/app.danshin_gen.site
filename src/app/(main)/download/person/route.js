import { getPerson } from "@/services/download";
import { getServerToken } from '@/lib/auth';

export async function GET(request) {
    const token = await getServerToken();
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");

    return getPerson(personId, token);
}

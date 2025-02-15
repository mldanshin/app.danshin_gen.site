import { getTree } from "@/services/download";
import { getAccessToken } from '@/lib/cookies';

export async function GET(request) {
    const token = await getAccessToken();
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");
    const parentId = url.searchParams.get("parent_id");

    return getTree(personId, parentId, token);
}

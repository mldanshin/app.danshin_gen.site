import { getServerToken } from '@/lib/auth';
import { getTreeWindow } from "@/services/tree";

export async function GET(request) {
    const token = await getServerToken();
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");
    const parentId = url.searchParams.get("parent_id");

    return getTreeWindow(personId, parentId, token);
}

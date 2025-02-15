import getTree from "@/repositories/download/tree.js";

export async function GET(request) {
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");
    const parentId = url.searchParams.get("parent_id");

    return getTree(personId, parentId);
}

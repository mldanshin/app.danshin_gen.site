import getTree from "@/repositories/tree/window";

export async function GET(request) {
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");
    const parentId = url.searchParams.get("parent_id");

    return getTree(personId, parentId);
}

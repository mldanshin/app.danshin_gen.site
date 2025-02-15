import getPhoto from "@/repositories/photo.js";

export async function GET(request) {
    const url = new URL(request.url);
    const personId = url.searchParams.get("personId");
    const fileName = url.searchParams.get("fileName");

    return getPhoto(personId, fileName);
}

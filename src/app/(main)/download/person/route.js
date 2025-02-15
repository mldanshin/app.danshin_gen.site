import getPerson from "@/repositories/download/person";

export async function GET(request) {
    const url = new URL(request.url);
    const personId = url.searchParams.get("person_id");

    return getPerson(personId);
}

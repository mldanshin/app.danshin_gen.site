import { genApiGetRequest } from '@/lib/api';

const baseUrl =  process.env.NEXT_PUBLIC_API_URL;

export async function getDB(token) {
    const response = await genApiGetRequest('download/db', token);

    if (!response || !response.ok) {
        return null;
    }

    return new Response(await response.blob(), {
        status: response.status,
        headers: {"Content-Type":"application/sql"}
    });
}

export async function getPeople(token) {
    const response = await genApiGetRequest('download/people?type=pdf', token);

    if (!response || !response.ok) {
        return null;
    }

    return response;
}

export async function getPerson(personId, token) {
    const response = await genApiGetRequest(`download/person/${personId}?type=pdf`, token);

    if (!response || !response.ok) {
        return null;
    }

    return response;
}

export async function getPhoto(token) {
    const response = await genApiGetRequest("download/photo", token);

    if (!response || !response.ok) {
        return null;
    }

    return response;
}

export async function getTree(personId, parentId, token) {
    const response = await genApiGetRequest("download/tree/" + personId + (parentId ? "?parent_id=" + parentId : ""), token);

    if (!response || !response.ok) {
        return null;
    }

    return response;
}

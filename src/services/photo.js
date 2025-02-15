import { genApiGetRequest } from '@/lib/api';

export async function getPhotoData(personId, fileName, token) {
    const response = await genApiGetRequest('photo/' + personId + "/" + fileName, token);

    if (!response || !response.ok) {
        return null;
    }

    const blob = await response.blob();
    return new Response(blob, {
        status: response.status,
        headers: {
            'Content-Type': response.headers.get('content-type'),
            'Content-Length': blob.size.toString(),
        }
    });
}

export async function getPhotoDescriptionList(personId, token) {
    const response = await genApiGetRequest('person-photo/' + personId, token);

    if (!response || !response.ok) {
        return null;
    }

    return await response.json();
}

import { genApiGetRequest } from '@/lib/api';

export async function getTreeImage(personId, parentId, token) {
    const response = await genApiGetRequest('tree/image-interactive/' + personId + getParamsRequest(parentId), token);

    if (!response || !response.ok) {
        return null;
    }

    return await response.text();
}

export async function getTreeToggle(personId, parentId = null, token) {
    const response = await genApiGetRequest('tree/toggle/' + personId + getParentRequest(parentId), token);
    if (!response || !response.ok) {
        return null;
    }

    return await response.json();
}

export async function getTreeWindow(personId, parentId, token) {
    const response = await genApiGetRequest('download/tree/' + personId + (parentId ? "?parent_id=" + parentId : ""), token);

    if (!response || !response.ok) {
        return null;
    }

    const blob = await response.blob();
    return new Response(blob, {
        status: 200,
        headers: {
            'Content-Type': response.headers.get('content-type') || 'image/jpeg',
            'Content-Length': blob.size.toString(),
        }
    });
}

function getParamsRequest(parentId = null) {
    let str = "?";

    if (parentId) {
        str += "parent_id=" + parentId + "&";
    }

    str += "path_person=/person&path_tree=/tree/person";
    str += "&image_person=/img/person/card.svg&image_tree=/img/tree/tree.svg";

    return str;
}

function getParentRequest(parentId = null) {
    if (parentId) {
        return "?parent_id=" + parentId;
    } else {
        return "";
    }
}

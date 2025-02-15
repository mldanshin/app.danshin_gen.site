import logger from "@/utils/logger";

export default async function getToggle(personId, parentId = null) {
    const url = process.env.API_URL + '/api/tree/toggle/' + personId + getParentRequest(parentId);
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        if (res.status === 204) {
            return {};
        } else {
            return res.json();
        }
    } else {
        logger.error("Url:" + url + ". Http status: " + res.status + ". " + "Response text: " + await res.text());
        return null;
    }
}

function getParentRequest(parentId = null) {
    if (parentId) {
        return "?parent_id=" + parentId;
    } else {
        return "";
    }
}

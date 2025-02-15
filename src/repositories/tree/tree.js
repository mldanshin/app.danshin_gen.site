import logger from "@/utils/logger";

export default async function getImage(personId, parentId) {
    const url = process.env.API_URL + '/api/tree/image-interactive/' + personId + getParamsRequest(parentId);
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN
        })
    });

    if (res.ok) {
        return res.text();
    } else {
        logger.error("Url:" + url + ". Http status: " + res.status + ". " + "Response text: " + await res.text());
        return null;
    }
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

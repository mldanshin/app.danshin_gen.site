import logger from "@/utils/logger";

/**
 * 
 * @param {string} order 
 * @param {string} search 
 * @returns 
 */
export default async function getPeople(order, search) {
    const url = process.env.API_URL + '/api/people';
    const query = getRequest(order, search);
    const res = await fetch(url + query, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        return res;
    } else {
        logger.error("Url:" + url + query + ". Http status: " + res.status + ". " + "Response text: " + await res.text());
        return null;
    }
}

function getRequest(order, search) {
    let str = "";

    if (order || search) {
        str += "?";
    }

    if (order) {
        str += "order=" + order;
    }

    if (order && search) {
        str += "&";
    }

    if (search) {
        str += "search=" + search;
    }

    return str;
}

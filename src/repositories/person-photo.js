import logger from "@/utils/logger";

/**
 * 
 * @param {int} personId 
 * @returns 
 */
export default async function getPhotoListByPerson(personId) {
    const url = process.env.API_URL + '/api/person-photo/' + personId;
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        return res.json();
    } else {
        logger.error("Url:" + url + ". Http status: " + res.status + ". " + "Response text: " + await res.text());
        return null;
    }
}

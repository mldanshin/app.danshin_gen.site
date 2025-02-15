import logger from "@/utils/logger";

/**
 * 
 * @param {int} userId 
 * @returns 
 */
export default async function unsubscribe(userId) {
    const url = process.env.DANSHIN_ID_URL + '/api/subscriptions/genealogy-dates/telegram/delete/' + userId;
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.DANSHIN_ID_API_TOKEN,
            'Content-Type': 'application/json'
        }),
        cache: 'no-store'
    });

    if (res.ok) {
        return true;
    } else {
        logger.error("Url:" + url + ". Http status: " + res.status + ". " + "Response text: " + await res.text());
        return null;
    }
}

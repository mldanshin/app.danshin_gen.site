import logger from "@/utils/logger";
import { notFound } from 'next/navigation';

/**
 * 
 * @param {int} id 
 * @returns 
 */
export default async function getPerson(id) {
    const url = process.env.API_URL + '/api/person/' + id;
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN,
            'Content-Type': 'application/json'
        })
    });

    if (res.ok) {
        return res.json();
    } else if (res.status === 404) {
        notFound();
    } else {
        logger.error("Url:" + url + ". Http status: " + res.status + ". " + "Response text: " + await res.text());
        return null;
    }
}

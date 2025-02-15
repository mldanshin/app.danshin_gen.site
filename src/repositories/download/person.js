/**
 * 
 * @param {int} personId 
 * @returns 
 */
export default async function getPerson(personId) {
    const res = await fetch(process.env.API_URL + "/api/download/person/" + personId + "?type=pdf", {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN
        })
    });

    if (res.ok) {
        return res;
    } else {
        return new Response(await res.text(), {
            status: res.status
        })
    }
}

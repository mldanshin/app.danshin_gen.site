/**
 * 
 * @param {int} personId 
 * @param {string} fileName 
 * @returns 
 */
export default async function getPhoto(personId, fileName) {
    const url = process.env.API_URL + "/api/photo/" + personId + "/" + fileName;
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN
        })
    });

    if (res.ok) {
        return new Response(await res.blob(), {
            status: 200
        });
    } else {
        return new Response(await res.text(), {
            status: res.status
        });
    }
}

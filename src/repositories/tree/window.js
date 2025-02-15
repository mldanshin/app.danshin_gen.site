/**
 * 
 * @param {int} personId 
 * @param {int} parentId 
 * @returns 
 */
export default async function getTree(personId, parentId) {
    const url = process.env.API_URL + "/api/download/tree/" + personId + (parentId ? "?parent_id=" + parentId : "");
    const res = await fetch(url, {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN
        })
    });

    if (res.ok) {
        return new Response(await res.blob(), {
            status: 200
        })
    } else {
        return new Response(await res.text(), {
            status: res.status
        })
    }
}

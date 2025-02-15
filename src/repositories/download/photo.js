export default async function getPhoto() {
    const res = await fetch(process.env.API_URL + "/api/download/photo", {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN
        })
    })

    if (res.ok) {
        return res;
    } else {
        return new Response(await res.text(), {
            status: res.status
        })
    }
}
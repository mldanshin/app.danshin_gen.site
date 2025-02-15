export default async function getDB() {
    const res = await fetch(process.env.API_URL + "/api/download/db", {
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.API_TOKEN
        })
    });

    if (res.ok) {
        var init = {status: 200, headers: {"Content-Type":"application/sql"}};
        return new Response(await res.blob(), init);
    } else {
        return new Response(await res.text(), {
            status: res.status
        })
    }
}

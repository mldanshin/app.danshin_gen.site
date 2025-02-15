import unsubscribe from "@/repositories/dates/unsubscribe";

export async function DELETE(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    const res = await unsubscribe(userId);
    if (res === null) {
        return new Response(JSON.stringify({ message: 'Error processing.' }), {
            status: 500,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    } else {
        return new Response(res.body, {
            status: 200,
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
    }
}

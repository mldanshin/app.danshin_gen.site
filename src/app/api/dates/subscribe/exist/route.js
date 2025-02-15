import existsSubscription from "@/repositories/dates/subscription-exists.js";

export async function GET(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id");

    const res = await existsSubscription(userId);

    return new Response(res.body, {
        status: 200,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
}

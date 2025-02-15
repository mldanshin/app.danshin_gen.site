import logger from "@/utils/logger";

export async function POST(request) {
    try {
        const { level, message } = await request.json();

        if (level && message) {
            logger.log(level, message);
            return new Response(JSON.stringify({ message: 'Logs successfully received' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Invalid request format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error processing logs' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

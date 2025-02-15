const sendLog = async (level, message) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ level, message }),
        });

        if (!response.ok) {
            throw new Error(`Error sending log: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error sending log:', error);
    }
};

export default sendLog;
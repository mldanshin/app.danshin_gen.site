import { noticeApiDeleteRequest } from '@/lib/api';
import { noticeApiGetRequest } from '@/lib/api';
import { noticeApiPostRequest } from '@/lib/api';

export async function getChannels(token) {
    return await noticeApiGetRequest('channel/channels', token);
}

export async function getChannelsClient() {
    try {
        const res = await fetch(`/api/dates/channels`);
        if (!res.ok) {
            return null;
        }
        return await res.json();
    } catch (error) {
        return null;
    }
}

export async function requestEmailVerification(token, email) {
    return await noticeApiPostRequest('channel/request-email-verification', token, { email });
}

export async function requestEmailVerificationClient(email) {
    try {
        const res = await fetch(`/api/dates/channels/request-email-verification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        return await res.json();
    } catch (error) {
        return null;
    }
}

export async function verifyEmailByLink(token, verificationToken) {
    return await noticeApiPostRequest('channel/verify-email', token, { token: verificationToken });
}

export async function verifyEmailByLinkClient(verificationToken) {
    try {
        const token = verificationToken;
        const res = await fetch(`/api/dates/channels/verify-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        return await res.json();
    } catch (error) {
        return null;
    }
}

export async function getTelegramLink(token) {
    return await noticeApiGetRequest('channel/telegram/link', token);
}

export async function getTelegramLinkClient() {
    try {
        const res = await fetch(`/api/dates/channels/telegram-link`);
        if (!res.ok) {
            return null;
        }
        const result = await res.json();
        return result.link;
    } catch (error) {
        return null;
    }
}

export async function deleteEmail(token, email) {
    return await noticeApiDeleteRequest('channel/email' + '?email=' + email, token);
}

export async function deleteEmailClient(email) {
    try {
        const res = await fetch(`/api/dates/channels/delete/email?email=${encodeURIComponent(email)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    } catch (error) {
        return null;
    }
}

export async function deleteTelegram(token, chatId) {
    return await noticeApiDeleteRequest('channel/telegram' + '?chatId=' + chatId, token);
}

export async function deleteTelegramClient(chatId) {
    try {
        const res = await fetch(`/api/dates/channels/delete/telegram?chatId=${chatId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    } catch (error) {
        return null;
    }
}

export async function createRecipient(token) {
    const response = await noticeApiPostRequest('recipients/create', token);

    if (!response || !response.ok) {
        return null;
    }

    return response;
}

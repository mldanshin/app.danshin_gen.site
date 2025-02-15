import { getChannels } from '@/services/channels';
import config from "@/config/dates.json";
import { getDatesAll } from "@/services/dates";
import { getNotice } from "@/services/dates";
import { getServerToken } from '@/lib/auth';
import { createRecipient } from '@/services/channels';
import NoticeForm from '@/components/dates/NoticeForm'
import UnexpectedError from "@/components/UnexpectedError";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const token = await getServerToken();

    let channelsResponse = await getChannels(token);
    let channels = null;
    if (channelsResponse && channelsResponse.ok) {
        channels = await channelsResponse.json();
    }

    if (channelsResponse && channelsResponse.status == 404) {
        const res = await createRecipient(token);
        if (res && res.status != 201) {
            return <UnexpectedError />;
        }
    }

    const [dates, noticeResponse] = await Promise.all([
        getDatesAll(config.notice.sort_by_default, token),
        getNotice(token)
    ]);

    if (dates === null || noticeResponse === null) {
        return <UnexpectedError />;
    }

    let notice = null;
    if (noticeResponse.status == 200) {
        notice = await noticeResponse.json();
    }

    return <NoticeForm initialChannels={channels} initialDates={dates} initialNotice={notice} />;
}

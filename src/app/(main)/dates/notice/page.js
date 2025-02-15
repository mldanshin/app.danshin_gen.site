import { getChannels } from '@/services/channels';
import config from "@/config/dates.json";
import { getDatesAll } from "@/services/dates";
import { getNotice } from "@/services/dates";
import { getAccessToken } from '@/lib/cookies';
import { createRecipient } from '@/services/channels';
import NoticeForm from '@/components/dates/NoticeForm'
import { saveNotice } from '@/services/dates';
import UnexpectedError from "@/components/UnexpectedError";

export const dynamic = 'force-dynamic';

export default async function Page() {
    const token = await getAccessToken();

    let channelsResponse = await getChannels(token);
    let channels = null;
    if (channelsResponse && channelsResponse.ok) {
        channels = await channelsResponse.json();
    }

    if (channelsResponse && channelsResponse.status == 404) {
        //если первый раз зашёл создаём пользователя
        const res = await createRecipient(token);
        if (res && res.status != 201) {
            return <UnexpectedError />;
        }
    }

    const dates = await getDatesAll(config.notice.sort_by_default, token);
    if (dates === null) {
        return <UnexpectedError />;
    }

    const noticeResponse = await getNotice(token);
    if (noticeResponse === null) {
        return <UnexpectedError />;
    }

    let notice = null;
    if (noticeResponse.status == 200) {
        notice = await noticeResponse.json();
    } else {
        //если первый раз зашёл создаём дефолтные уведомления (все)
        const allDatesSet = new Set();
        dates.forEach((item) => {
            const dateType = item.type === 1 ? "BIRTH" : "DEATH";
            const key = `${item.person.id}-${dateType}`;
            allDatesSet.add(key);
        });

        const sendTime = config.notice.send_time;
        const timezone = 'Europe/Moscow';
        const dayAfter = config.notice.after_day;
        const dayBefore = config.notice.before_day;

        notice = {
            sendTime,
            timezone,
            dayAfter,
            dayBefore,
            dates: Array.from(allDatesSet).map((key) => {
                const [personId, dateType] = key.split('-');
                return {
                    personId: parseInt(personId),
                    dateType: dateType
                };
            })
        };

        const res = await saveNotice(notice, token);
        if (res && res.status != 201) {
            return <UnexpectedError />;
        }
    }

    return <NoticeForm initialChannels={channels} initialDates={dates} initialNotice={notice} />;
}

import { genApiGetRequest } from '@/lib/api';
import { noticeApiGetRequest } from '@/lib/api';
import { noticeApiPostRequest } from '@/lib/api';
import config from "@/config/dates.json";

export async function getDatesAll(sortBy, token) {
    const response = await genApiGetRequest('dates?sort_by=' + sortBy, token);

    if (!response || !response.ok) {
        return null;
    }

    return response.json();
}

export async function getDatesUpcoming(beforeDay, afterDay, token) {
    const response = await genApiGetRequest('dates/upcoming/' + getParams(beforeDay, afterDay), token);

    if (!response || !response.ok) {
        return null;
    }

    return response.json();
}

export async function getNotice(token) {
    return await noticeApiGetRequest('genealogy_dates', token);
}

export async function saveNotice(data, token) {
    return await noticeApiPostRequest('genealogy_dates', token, data);
}

function getParams(beforeDay, afterDay) {
    return "?date=" + getDate()
        + "&before_day=" + (beforeDay ? beforeDay : config.notice.before_day)
        + "&after_day=" + (afterDay ? afterDay : config.notice.after_day);
}

function getDate() {
    let now = new Date();
    const year = now.getFullYear();

    let month = String(now.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }

    let day = String(now.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}

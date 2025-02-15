"use server";

import { convertIntervalToString } from "@/helpers/date.js";
import { getDatesUpcoming } from "@/services/dates.js";
import { getNotice } from "@/services/dates.js";
import { getServerToken } from '@/lib/auth.js';
import locale from "@/locales/ru/dates/dates.json";
import Person from './Person.js';
import UnexpectedError from "@/components/UnexpectedError.js";

export default async function DatesUpcoming() {
    const token = await getServerToken();

    const noticeResponse = await getNotice(token);
    let beforeDay;
    let afterDay;
    if (noticeResponse && noticeResponse.status == 200) {
        const notice = await noticeResponse.json();
        beforeDay = notice.dayBefore;
        afterDay = notice.dayAfter;
    }

    const dates = await getDatesUpcoming(beforeDay, afterDay, token);
    if (dates === null) {
        return (
            <UnexpectedError />
        )
    }

    return (
        <div className="dates-container">
            <h2>{locale.title.upcoming}</h2>
            {
                (dates.beforeBirth.length === 0
                    & dates.beforeBirthWould.length === 0
                    & dates.beforeDeath.length === 0
                    & dates.todayBirth.length === 0
                    & dates.todayBirthWould.length === 0
                    & dates.todayDeath.length === 0
                    & dates.afterBirth.length === 0
                    & dates.afterBirthWould.length === 0
                    & dates.afterDeath.length === 0
                    ) ? (
                        <div>{locale.none}</div>
                    ) : (
                    <>
                        <Before dates={dates} />
                        <Today dates={dates} />
                        <After dates={dates} />
                    </>
                )
            }
        </div>
    )
}

function Before({ dates }) {
    if (dates.beforeBirth.length > 0 | dates.beforeBirthWould.length > 0 | dates.beforeDeath.length > 0) {
        return (
            <div>
                <h3>{locale.before}</h3>
                <ul>
                    {dates.beforeBirth.map((item, index) => (
                    <li className="dates-li" key={"dates_upcoming_before_" + index}>
                        <span>{item.date.string}</span>
                        <span> </span>
                        <span>{locale.birth.name}</span>
                        <span> </span>
                        <Person person={item.person} locale={locale} />
                        <span> </span>
                        <span>({locale.birth.fulfilled + " " + convertIntervalToString(item.age)})</span>
                    </li>
                    ))}
                    <BirthWould dates={dates.beforeBirthWould} />
                    <Death dates={dates.beforeDeath} />
                </ul>
            </div>
        )
    } else {
        return null;
    }
}

function Today({ dates }) {
    if (dates.todayBirth.length > 0 | dates.todayBirthWould.length > 0 | dates.todayDeath.length > 0) {
        return (
            <div>
                <h3>{locale.today}</h3>
                <ul>
                    {dates.todayBirth.map((item, index) => (
                    <li className="dates-li" key={"dates_upcoming_today_" + index}>
                        <span>{item.date.string}</span>
                        <span> </span>
                        <span>{locale.birth.name}</span>
                        <span> </span>
                        <Person person={item.person} locale={locale} />
                        <span> </span>
                        <span>({locale.birth.fulfilled + " " + convertIntervalToString(item.age)})</span>
                    </li>
                    ))}
                    <BirthWould dates={dates.todayBirthWould} />
                    <Death dates={dates.todayDeath} />
                </ul>
            </div>
        )
    } else {
        return null;
    }
}

function After({ dates }) {
    if (dates.afterBirth.length > 0 | dates.afterBirthWould.length > 0 | dates.afterDeath.length > 0) {
        return (
            <div>
                <h3>{locale.after}</h3>
                <ul>
                    {dates.afterBirth.map((item, index) => (
                    <li className="dates-li" key={"dates_upcoming_after_" + index}>
                        <span>{item.date.string}</span>
                        <span> </span>
                        <span>{locale.birth.name}</span>
                        <span> </span>
                        <Person person={item.person} locale={locale} />
                        <span> </span>
                        <span>({locale.birth.will_be + " " + convertIntervalToString(item.age)})</span>
                    </li>
                    ))}
                    <BirthWould dates={dates.afterBirthWould} />
                    <Death dates={dates.afterDeath} />
                </ul>
            </div>
        )
    } else {
        return null;
    }
}

function BirthWould({ dates }) {
    return (
        <>
            {dates.map((item, index) => (
                <li className="dates-li" key={"dates_upcoming_birth_would_" + index}>
                    <span>{item.date.string}</span>
                    <span> </span>
                    <span>{locale.birth.name}</span>
                    <span> </span>
                    <Person person={item.person} locale={locale} />
                    <span> </span>
                    <span>({convertIntervalToString(item.age) + " " + locale.birth.before})</span>
                </li>
            ))}
        </>
    )
}

function Death({ dates }) {
    return (
        <>
            {dates.map((item, index) => (
                <li className="dates-li" key={"dates_upcoming_death_" + index}>
                    <span>{item.date.string}</span>
                    <span> </span>
                    <span>{locale.death.name}</span>
                    <span> </span>
                    <Person person={item.person} locale={locale} />
                    <span> </span>
                    <span>
                        ({convertIntervalToString(item.interval)
                        + " " + locale.death.passed_age
                        + " " + convertIntervalToString(item.age)})
                    </span>
                </li>
            ))}
        </>
    )
}

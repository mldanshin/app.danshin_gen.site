"use server";

import { convertIntervalToString } from "@/helpers/date.js";
import dict from "@/dictionaries/ru/dates/dates.json";
import getDatesUpcoming from "@/repositories/dates/upcoming.js";
import Person from './person.js';
import UnexpectedError from "@/components/unexpected_error.js";
import { v4 as uuidv4 } from 'uuid';

export default async function DatesUpcoming() {
    const dates = await getDatesUpcoming();
    if (dates === null) {
        return (
            <UnexpectedError />
        )
    }

    return (
        <div className="dates-container">
            <h2>{dict.title.upcoming}</h2>
            {
                (dates.pastBirth.length === 0
                    & dates.pastBirthWould.length === 0
                    & dates.pastDeath.length === 0
                    & dates.todayBirth.length === 0
                    & dates.todayBirthWould.length === 0
                    & dates.todayDeath.length === 0
                    & dates.nearestBirth.length === 0
                    & dates.nearestBirthWould.length === 0
                    & dates.nearestDeath.length === 0
                    ) ? (
                        <div>{dict.none}</div>
                    ) : (
                    <>
                        <Past dates={dates} />
                        <Today dates={dates} />
                        <Nearest dates={dates} />
                    </>
                )
            }
        </div>
    )
}

function Past({ dates }) {
    if (dates.pastBirth.length > 0 | dates.pastBirthWould.length > 0 | dates.pastDeath.length > 0) {
        return (
            <div>
                <h3>{dict.past}</h3>
                <ul>
                    {dates.pastBirth.map((item, index) => (
                    <li className="dates-li" key={"dates_upcoming_past_" + index}>
                        <span>{item.date.string}</span>
                        <span> </span>
                        <span>{dict.birth.name}</span>
                        <span> </span>
                        <Person person={item.person} dict={dict} />
                        <span> </span>
                        <span>({dict.birth.fulfilled + " " + convertIntervalToString(item.age)})</span>
                    </li>
                    ))}
                    <BirthWould dates={dates.pastBirthWould} />
                    <Death dates={dates.pastDeath} />
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
                <h3>{dict.today}</h3>
                <ul>
                    {dates.todayBirth.map((item, index) => (
                    <li className="dates-li" key={"dates_upcoming_today_" + index}>
                        <span>{item.date.string}</span>
                        <span> </span>
                        <span>{dict.birth.name}</span>
                        <span> </span>
                        <Person person={item.person} dict={dict} />
                        <span> </span>
                        <span>({dict.birth.fulfilled + " " + convertIntervalToString(item.age)})</span>
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

function Nearest({ dates }) {
    if (dates.nearestBirth.length > 0 | dates.nearestBirthWould.length > 0 | dates.nearestDeath.length > 0) {
        return (
            <div>
                <h3>{dict.nearest}</h3>
                <ul>
                    {dates.nearestBirth.map((item, index) => (
                    <li className="dates-li" key={"dates_upcoming_nearest_" + index}>
                        <span>{item.date.string}</span>
                        <span> </span>
                        <span>{dict.birth.name}</span>
                        <span> </span>
                        <Person person={item.person} dict={dict} />
                        <span> </span>
                        <span>({dict.birth.will_be + " " + convertIntervalToString(item.age)})</span>
                    </li>
                    ))}
                    <BirthWould dates={dates.nearestBirthWould} />
                    <Death dates={dates.nearestDeath} />
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
                    <span>{dict.birth.name}</span>
                    <span> </span>
                    <Person person={item.person} dict={dict} />
                    <span> </span>
                    <span>({convertIntervalToString(item.age) + " " + dict.birth.past})</span>
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
                    <span>{dict.death.name}</span>
                    <span> </span>
                    <Person person={item.person} dict={dict} />
                    <span> </span>
                    <span>
                        ({convertIntervalToString(item.interval)
                        + " " + dict.death.passed_age
                        + " " + convertIntervalToString(item.age)})
                    </span>
                </li>
            ))}
        </>
    )
}

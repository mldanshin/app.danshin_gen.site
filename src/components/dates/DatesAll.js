"use server";

import config from "@/config/dates.json";
import { convertDateToStringISO8601 } from '@/helpers/date';
import { getDatesAll }  from "@/services/dates.js";
import { getAccessToken } from '@/lib/cookies';
import locale from "@/locales/ru/dates/dates.json";
import Person from '@/components/dates/Person.js';
import UnexpectedError from '@/components/UnexpectedError.js';

export default async function DatesAll() {
    const token = await getAccessToken();
    const dates = await getDatesAll(config.list.sort_by_default, token);
    if (dates === null) {
        return (
            <UnexpectedError />
        );
    }

    return (
        <div className="dates-container">
            <h2>{locale.title.all}</h2>
            {(dates != null & dates.length > 0) ? (
                <ul>
                    {dates.map((item, index) => 
                        <li className="dates-li" key={"dates_all_item_" + index}>
                            <span>{convertDateToStringISO8601(item.date)}</span>
                            <span> </span>
                            {item.type == 1 && (<span>{locale.birth.name}</span>)}
                            {item.type == 2 && (<span>{locale.death.name}</span>)}
                            <span> </span>
                            <Person person={item.person} />
                        </li>
                    )}
                </ul>
                ) : (
                <div>{locale.not_found}</div>
            )}
        </div>
    )
}

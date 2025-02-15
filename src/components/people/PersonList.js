"use client";

import locale from "@/locales/ru/people/people.json";
import Person from "./Person";
import UnexpectedError from "@/components/UnexpectedError";

export default function PersonList({ people }) {
    let list = [];
    if (people === null) {
        return (
            <UnexpectedError />
        );
    } else {
        list = people.map(item => 
            <li className="people-person-links" key={"people_person_links" + item.id}>
                <Person person={item} />
            </li>
        );
    }

    return (
        <>
        {(list.length > 0) ? (
            <div className="people-list">
                <ul>
                    {list}
                </ul>
            </div>
        ) : (
            <div>
                {locale.list.not_found}
            </div>
        )}
        </>
    )
}

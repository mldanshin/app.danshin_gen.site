"use client";

import dict from "@/dictionaries/ru/people/people.json";
import Person from "./person";
import UnexpectedError from "@/components/unexpected_error";

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
                {dict.list.not_found}
            </div>
        )}
        </>
    )
}

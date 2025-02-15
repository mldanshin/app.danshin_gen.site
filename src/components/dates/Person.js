"use server";

import locale from "@/locales/ru/dates/dates.json";

export default async function Person({ person }) {
    return (
        <>
            <span>{person.surname ? person.surname : locale.person.surname.unknown}</span>
            <span> </span>
            {person.oldSurname && (
            <>
                (
                {person.oldSurname.map(
                    (oldSurname, index) => {
                        if (person.oldSurname.length != (index + 1)) {
                            return (
                                <span key={"dates_person_old_surname_" + index}>
                                    {oldSurname},
                                </span>
                            ) 
                        }else {
                            return (
                                <span key={"dates_person_old_surname_" + index}>{oldSurname}</span>
                            )
                        }
                    }
                )}
                )
                <span> </span>
            </>
            )}
            <span>{person.name ? person.name : locale.person.name.unknown}</span>
            <span> </span>
            <span>{person.patronymic ? person.patronymic : locale.person.patronymic.unknown}</span>
        </>
    )
}

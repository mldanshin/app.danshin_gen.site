"use client";

import locale from '@/locales/ru/person/person.json';
import getQuery from "@/helpers/search-params.js";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PersonShort({ person }) {
    const searchParams = useSearchParams();

    return (
        <>
            <Link href={"/person/" + person.id + getQuery(searchParams)} title={locale.button.person.tooltip}>
                {person.surname ? person.surname : locale.person_short.surname.unknown}
                <span> </span>
                {person.oldSurname && (
                <>
                    (
                    {person.oldSurname.map(
                        (oldSurname, index) => {
                            if (person.oldSurname.length != (index + 1)) {
                                return (
                                    <span key={"person_person_short_old_surname_" + person.id + "_" + index}>
                                        {oldSurname},
                                    </span>
                                ) 
                            }else {
                                return (
                                    <span key={"person_person_short_old_surname_" + person.id + "_" + index}>
                                        {oldSurname}
                                    </span>
                                )
                            }
                        }
                    )}
                    )
                    <span> </span>
                </>
                )}
                <span>{person.name ? person.name : locale.person_short.name.unknown}</span>
                <span> </span>
                <span>
                    {person.patronymic
                        ? person.patronymic
                        : (person.patronymic ==="" ? "" : locale.person_short.patronymic.unknown)
                    }
                </span>
            </Link>
            <Link href={"/tree/person/" + person.id + getQuery(searchParams)} title={locale.button.tree.tooltip}>
                <Image src="/img/tree/tree.svg" alt={locale.button.tree.alt} width={30} height={30} />
            </Link>
        </>
    )
}

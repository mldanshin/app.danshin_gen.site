"use client";

import dict from '@/dictionaries/ru/person/person.json';
import getQuery from "@/helpers/search-params.js";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PersonShort({ person }) {
    const searchParams = useSearchParams();

    return (
        <>
            <Link href={"/person/" + person.id + getQuery(searchParams)} title={dict.button.person.tooltip}>
                {person.surname ? person.surname : dict.person_short.surname.unknown}
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
                <span>{person.name ? person.name : dict.person_short.name.unknown}</span>
                <span> </span>
                <span>
                    {person.patronymic
                        ? person.patronymic
                        : (person.patronymic ==="" ? "" : dict.person_short.patronymic.unknown)
                    }
                </span>
            </Link>
            <Link href={"/tree/person/" + person.id + getQuery(searchParams)} title={dict.button.tree.tooltip}>
                <Image src="/img/tree/tree.svg" alt={dict.button.tree.alt} width={30} height={30} />
            </Link>
        </>
    )
}

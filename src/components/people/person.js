"use client";

import dict from "@/dictionaries/ru/people/person.json";
import getQuery from "@/helpers/search-params";
import Image from "next/image";
import Link from "next/link";
import PeopleVisibilityContext from '@/components/people/visibility-context';
import { useContext } from "react";
import { useSearchParams } from "next/navigation";

export default function Person({ person }) {
    const searchParams = useSearchParams();

    const { changeVisibility } = useContext(PeopleVisibilityContext);

    return (
        <>
            <Link href={"/person/" + person.id + getQuery(searchParams)}
                title={dict.link.person.tooltip}
                onClick={() => {
                    if (window.innerWidth < 551) {
                        changeVisibility();
                    }
                }}
                >
                {person.surname ? person.surname : dict.surname.unknown}
                <span> </span>
                {person.oldSurname && (
                <>
                    (
                    {person.oldSurname.map(
                        (oldSurname, index) => {
                            if (person.oldSurname.length != (index + 1)) {
                                return (
                                    <span key={"person_oldSurname_" + person.id + "_" + index}>
                                        {oldSurname},
                                    </span>
                                ) 
                            }else {
                                return (
                                    <span key={"person_oldSurname_" + person.id + "_" + index}>
                                        {oldSurname}
                                    </span>
                                )
                            }
                        }
                    )}
                    )
                </>
                )}
                <span> </span>
                {person.name ? person.name : dict.name.unknown}
                <span> </span>
                {person.patronymic
                    ? person.patronymic
                    : (person.patronymic === "" ? "" : dict.patronymic.unknown)
                }
            </Link>
            <Link href={"/tree/person/" + person.id + getQuery(searchParams)}
                title={dict.link.tree.tooltip}
                onClick={() => {
                    if (window.innerWidth < 551) {
                        changeVisibility();
                    }
                }}
                >
                <Image src="/img/tree/tree.svg" alt="genealogy tree" width={30} height={30} />
            </Link>
        </>
    )
}

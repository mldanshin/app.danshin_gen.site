"use server";

import dict from '@/dictionaries/ru/person/person.json';
import DownloadPerson from "@/components/download/person.js";
import getPerson from '@/repositories/person.js';
import Person from '@/components/person/person.js';
import PhotoList from '@/components/person/photo-list.js';
import TreeLink from "@/components/person/tree-link.js";
import { Suspense } from 'react';
import UnexpectedError from '@/components/unexpected_error';

export default async function Page({ params }) {
    const id = (await params).id;

    const person = await getPerson(id)
    if (person === null) {
        return (
            <UnexpectedError />
        );
    }

    return (
        <>
            <h2>
                <span>{dict.title}</span>
                <span> </span>
                <span>{person.surname ? person.surname : dict.person_short.surname.unknown}</span>
                <span> </span>
                <span>{person.name ? person.name : dict.person_short.name.unknown}</span>
                <span> </span>
                <span>{person.patronymic ? person.patronymic : dict.person_short.patronymic.unknown}</span>
            </h2>
            <div className="nav-list">
                <Suspense>
                    <TreeLink personId={id} />
                </Suspense>
                <DownloadPerson personId={id} />
            </div>
            <div className="person">
                <Person person={person} />
                <PhotoList personId={id} />
            </div>
        </>
    )
}

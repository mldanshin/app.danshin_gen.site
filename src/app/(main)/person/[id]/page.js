"use server";

import { getPerson } from '@/services/person.js';
import { getAccessToken } from '@/lib/cookies';
import DownloadPerson from "@/components/download/DownloadPerson.js";
import locale from '@/locales/ru/person/person.json';
import Person from '@/components/person/person.js';
import PhotoList from '@/components/person/PhotoList.js';
import TreeLink from "@/components/person/TreeLink.js";
import { Suspense } from 'react';
import UnexpectedError from '@/components/UnexpectedError';

export default async function Page({ params }) {
    const id = (await params).id;
    const token = await getAccessToken();

    const person = await getPerson(id, token)
    if (person === null) {
        return (
            <UnexpectedError />
        );
    }

    return (
        <>
            <h2>
                <span>{locale.title}</span>
                <span> </span>
                <span>{person.surname ? person.surname : locale.person_short.surname.unknown}</span>
                <span> </span>
                <span>{person.name ? person.name : locale.person_short.name.unknown}</span>
                <span> </span>
                <span>{person.patronymic ? person.patronymic : locale.person_short.patronymic.unknown}</span>
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

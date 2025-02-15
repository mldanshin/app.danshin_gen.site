"use server";

import { convertDateToString } from '@/helpers/date';
import { convertIntervalToString } from '@/helpers/date';
import locale from '@/locales/ru/person/person.json';
import Link from 'next/link';
import PersonShort from './PersonShort';
import { Suspense } from 'react';

export default async function Person({ person }) {
    return (
        <div className="person-card">
            {person.isUnavailable ? (
                <>
                <div>{locale.unavailable.label}</div>
                <div>{locale.unavailable.content}</div>
                </>
            ) : (
                <>
                <div>{locale.live.label}</div>
                {person.isLive ? (<div>{locale.live.yes}</div>) : (<div>{locale.live.no}</div>)}
                </>
            )}

            <div>{locale.gender.label}</div>
            <div>{locale.gender.types[person.gender]}</div>

            <div>{locale.surname.label}</div>
            <div>{person.surname ? person.surname : locale.surname.unknown}</div>

            {person.oldSurname && (
            <>
            <div>{locale.old_surname.label}</div>
            <div>
                {person.oldSurname.map((oldSurname, index) => 
                    <div key={"pesron_old_surname_" + index}>{oldSurname}</div>)
                }
            </div>
            </>
            )}

            <div>{locale.name.label}</div>
            <div>{person.name ? person.name : locale.name.unknown}</div>

            <div>{locale.patronymic.label}</div>
            <div>
                {person.patronymic
                    ? person.patronymic
                    : (person.patronymic === "" ? "" : locale.patronymic.unknown)
                }
            </div>

            <div>{locale.birth_date.label}</div>
            <div>
                {convertDateToString(person.birthDate)}
                {person.isLive && person.age && (
                    <>
                    {" (" + convertIntervalToString(person.age) + ")"}
                    </>
                )}
            </div>

            <div>{locale.birth_place.label}</div>
            <div>{person.birthPlace}</div>

            {(!person.isLive) && (
                <>
                <div>{locale.death_date.label}</div>
                <div>
                    <span>{convertDateToString(person.deathDate)}</span>
                    <span>
                        {(person.deathDateInterval || person.age) && (
                            <>{"("}</>
                        )}
                        {person.deathDateInterval && (
                            <>
                            {convertIntervalToString(person.deathDateInterval) + " " + locale.death_date.interval.before}
                            </>
                        )}
                        {(person.deathDateInterval && person.age) && (
                            <>{" "}</>
                        )}
                        {person.age && (
                            <>
                            {locale.death_date.interval.age + " " + convertIntervalToString(person.age)}
                            </>
                        )}
                        {(person.deathDateInterval || person.age) && (
                            <>{")"}</>
                        )}
                    </span>
                </div>
                <div>{locale.burial_place.label}</div>
                <div>{person.burialPlace}</div>
                </>
            )}

            {person.note && (
                <>
                <div>{locale.note.label}</div>
                <div>{person.note}</div>
                </>
            )}

            {person.activities && (
                <>
                <div>{locale.activities.label}</div>
                <div>
                    {person.activities.map((activitie, index) => <div key={"pesron_activities_" + index}>{activitie}</div>)}
                </div>
                </>
            )}

            {person.emails && (
                <>
                <div>{locale.emails.label}</div>
                <div>
                    {person.emails.map((email, index) => <div key={"pesron_emails_" + index}>{email}</div>)}
                </div>
                </>
            )}

            {person.internet && (
                <>
                <div>{locale.internet.label}</div>
                <div>
                    {person.internet.map((internet, index) => <Link key={"pesron_internet_" + index} href={internet.url} title={internet.url} target="_blank" rel="noopener noreferrer">{internet.name}</Link>)}
                </div>
                </>
            )}

            {person.phones && (
                <>
                <div>{locale.phones.label}</div>
                <div>
                    {person.phones.map((phone, index) => <div key={"pesron_phones_" + index}>{phone}</div>)}
                </div>
                </>
            )}

            {person.residences && (
                <>
                <div>{locale.residences.label}</div>
                <div>
                    {person.residences.map((residence, index) => <div key={"pesron_residences_" + index}>
                        <span>{residence.name}</span>
                        <span> </span>
                        {residence.date && (<span>{"(" + locale.residences.date + " " + convertDateToString(residence.date) + ")"}</span>)}
                    </div>)}
                </div>
                </>
            )}

            {person.parents && (
                <>
                <div>{locale.parents.label}</div>
                <ul className="person-card-list">
                    {person.parents.map((parent, index) => <li key={"pesron_parents_" + index} className="person-card-cell-list">
                        <div>{locale.parents.roles[parent.role]}</div>
                        <Suspense>
                            <PersonShort person={parent.person} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}

            {person.marriages && (
                <>
                <div>{locale.marriages.label}</div>
                <ul className="person-card-list">
                    {person.marriages.map((marriage, index) => <li className="person-card-cell-list" key={"pesron_marriages_" + index}>
                        <div>{locale.marriages.roles[marriage.role]}</div>
                        <Suspense>
                            <PersonShort person={marriage.soulmate} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}

            {person.children && (
                <>
                <div>{locale.children.label}</div>
                <ul className="person-card-list">
                    {person.children.map((child, index) => <li key={"pesron_children_" + index} className="person-card-cell-list-2">
                        <Suspense>
                            <PersonShort person={child} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}

            {person.brothersSisters && (
                <>
                <div>{locale.brothers_sisters.label}</div>
                <ul className="person-card-list">
                    {person.brothersSisters.map((person, index) => <li key={"pesron_brothers_sisters_" + index} className="person-card-cell-list-2">
                        <Suspense>
                            <PersonShort person={person} />
                        </Suspense>
                    </li>)}
                </ul>
                </>
            )}
        </div>
    )
}

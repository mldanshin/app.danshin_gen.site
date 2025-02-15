"use server";

import dict from '@/dictionaries/ru/person/person.json';
import getPhotoListByPerson from "@/repositories/person-photo.js";
import PhotoItem from "@/components/person/photo-item.js";
import UnexpectedError from '@/components/unexpected_error';

export default async function PhotoList({ personId }) {
    const photo = await getPhotoListByPerson(personId);
    if (photo === null) {
        return (
            <UnexpectedError />
        );
    }

    return (
        <div className="person-photo-container">
            <div>{dict.photo.label}</div>
            {Object.keys(photo).length !== 0 ? (
                <ul className="person-photo-list">
                    {photo.map((item, index) => <li key={"person_photo_list_" + personId + "_" + index}>
                        <PhotoItem personId={personId} fileName={item.fileName} date={item.date} />
                    </li>)}
                </ul>
            ) : (
            <div>{dict.photo.not_found}</div>
        )}
        </div>
    )
}

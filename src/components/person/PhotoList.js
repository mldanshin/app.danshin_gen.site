"use server";

import { getPhotoDescriptionList } from "@/services/photo.js";
import { getAccessToken } from '@/lib/cookies';
import locale from '@/locales/ru/person/person.json';
import PhotoItem from "@/components/person/PhotoItem.js";
import UnexpectedError from '@/components/UnexpectedError';

export default async function PhotoList({ personId }) {
    const token = await getAccessToken();
    const photo = await getPhotoDescriptionList(personId, token);
    if (photo === null) {
        return (
            <UnexpectedError />
        );
    }

    return (
        <div className="person-photo-container">
            <div>{locale.photo.label}</div>
            {Object.keys(photo).length !== 0 ? (
                <ul className="person-photo-list">
                    {photo.map((item, index) => <li key={"person_photo_list_" + personId + "_" + index}>
                        <PhotoItem personId={personId} fileName={item.fileName} date={item.date} />
                    </li>)}
                </ul>
            ) : (
            <div>{locale.photo.not_found}</div>
        )}
        </div>
    )
}

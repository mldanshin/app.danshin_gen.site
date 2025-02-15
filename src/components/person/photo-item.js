"use server";

import { convertDateToString } from '@/helpers/date.js';
import PhotoItemClient from "@/components/person/photo-item-client.js";

export default async function PhotoItem({ personId, fileName, date }) {
    return (
        <>
            <PhotoItemClient personId={personId} fileName={fileName} />
            <div>{convertDateToString(date)}</div>
        </>
    )
}

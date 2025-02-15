"use server";

import { convertDateToString } from '@/helpers/date.js';
import PhotoItemClient from "@/components/person/PhotoItemClient.js";

export default async function PhotoItem({ personId, fileName, date }) {
    return (
        <>
            <PhotoItemClient personId={personId} fileName={fileName} />
            <div>{convertDateToString(date)}</div>
        </>
    )
}

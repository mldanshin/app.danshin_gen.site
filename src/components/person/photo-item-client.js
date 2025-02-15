"use client";

import Image from "next/image";
import { useEffect } from 'react';
import { useState } from "react";

export default function PhotoItemClient({ personId, fileName }) {
    const [src, setSrc] = useState(null);

    useEffect(() => {
        setUrl(personId, fileName);
    }, [personId, fileName]);

    async function setUrl(personIdArg, fileNameArg) {
        const res = await fetch(
            "/api/photo?personId=" + personIdArg + "&fileName=" + fileNameArg
        );

        if (res.ok) {
            let blob = await res.blob();
            setSrc(URL.createObjectURL(new Blob([blob], { type: "image/jpeg" })));
        } else {
            throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
        }
    }

    return (
        <>
            {src && (
                <Image
                    className="person-photo"
                    src={src}
                    alt="photo person"
                    width={500}
                    height={300}
                />
            )}
        </>
    );
}

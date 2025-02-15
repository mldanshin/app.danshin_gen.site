"use client";

import dict from '@/dictionaries/ru/person/person.json';
import Image from "next/image";
import ThemeContext from '@/components/theme/theme-context';
import { useContext } from "react";

export default function DownloadPerson({ personId }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <a href={"/download/person?person_id=" + personId} title={dict.button.download.tooltip}>
                <Image src={theme.iconDownloadPerson} alt={dict.button.download.alt} width={56} height={56} />
            </a>
        </>
    )
}

"use client";

import locale from '@/locales/ru/person/person.json';
import Image from "next/image";
import ThemeContext from '@/contexts/ThemeContext';
import { useContext } from "react";

export default function DownloadPerson({ personId }) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <a href={"/download/person?person_id=" + personId} title={locale.button.download.tooltip}>
                <Image src={theme.iconDownloadPerson} alt={locale.button.download.alt} width={56} height={56} />
            </a>
        </>
    )
}

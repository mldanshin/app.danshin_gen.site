"use client";

import locale from '@/locales/ru/download/download.json';
import Image from 'next/image';
import ThemeContext from '@/contexts/ThemeContext';
import { useContext } from "react";

export default function DownloadDB() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <a href={"/download/db"} title={locale.database.tooltip}>
                <Image src={theme.iconDownloadDb} width={56} height={56} alt={locale.database.alt} />
            </a>
        </>
    )
}

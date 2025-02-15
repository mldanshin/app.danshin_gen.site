"use client";

import dict from '@/dictionaries/ru/download/download.json';
import Image from 'next/image';
import ThemeContext from '@/components/theme/theme-context';
import { useContext } from "react";

export default function DownloadDB() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <a href={"/download/db"} title={dict.database.tooltip}>
                <Image src={theme.iconDownloadDb} width={56} height={56} alt={dict.database.alt} />
            </a>
        </>
    )
}

"use client";

import locale from '@/locales/ru/download/download.json';
import Image from 'next/image';

export default function DownloadPeople() {
    return (
        <a href={"/download/people"} title={locale.people.tooltip}>
            <Image
                src="/img/download/people-pdf.svg"
                width={56}
                height={56}
                alt={locale.people.alt}
            />
        </a>
    )
}

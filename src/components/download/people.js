"use client";

import dict from '@/dictionaries/ru/download/download.json';
import Image from 'next/image';

export default function DownloadPeople() {
    return (
        <a href={"/download/people"} title={dict.people.tooltip}>
            <Image
                src="/img/download/people-pdf.svg"
                width={56}
                height={56}
                alt={dict.people.alt}
            />
        </a>
    )
}

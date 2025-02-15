"use client";

import dict from '@/dictionaries/ru/download/download.json';
import Image from 'next/image';

export default function DownloadPhoto() {
    return (
        <a href="/download/photo" title={dict.photo.tooltip}>
            <Image
                src="/img/download/photo.svg"
                width={56}
                height={56}
                alt={dict.photo.alt}
            />
        </a>
    )
}
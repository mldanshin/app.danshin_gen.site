"use client";

import locale from '@/locales/ru/download/download.json';
import Image from 'next/image';

export default function DownloadPhoto() {
    return (
        <a href="/download/photo" title={locale.photo.tooltip}>
            <Image
                src="/img/download/photo.svg"
                width={56}
                height={56}
                alt={locale.photo.alt}
            />
        </a>
    )
}
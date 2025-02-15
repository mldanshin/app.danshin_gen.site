"use client";

import locale from '@/locales/ru/layout.json';
import getQuery from "@/helpers/search-params";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

export default function HomeNavigation() {
    const searchParams = useSearchParams();

    return (
        <Link href={"/" + getQuery(searchParams)} title={locale.nav.home.tooltip}>
            <Image
                src="/img/layout/logo.svg"
                width={56}
                height={56}
                alt={locale.nav.home.alt}
                loading="eager"
            />
        </Link>
    )
}

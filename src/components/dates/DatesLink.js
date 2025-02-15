"use client";

import locale from '@/locales/ru/dates/dates.json';
import getQuery from "@/helpers/search-params.js";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

export default function DatesLink() {
    const searchParams = useSearchParams();
    return (
        <Link href={"/dates/all" + getQuery(searchParams)} title={locale.nav.index.tooltip}>
            <Image src="/img/dates/show.svg" alt={locale.nav.index.alt} width={56} height={56} />
        </Link>
    )
}

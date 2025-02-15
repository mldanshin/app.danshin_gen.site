"use client";

import locale from '@/locales/ru/dates/dates.json';
import getQuery from "@/helpers/search-params.js";
import Image from 'next/image';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Nav() {
    const searchParams = useSearchParams();

    return (
        <div className="nav-list">
            <Link href={"/dates/all" + getQuery(searchParams)} title={locale.nav.all.tooltip}>
                <Image src="/img/dates/list.svg" alt={locale.nav.all.alt} width={56} height={56} />
            </Link>
            <Link href={"/dates/upcoming" + getQuery(searchParams)} title={locale.nav.upcoming.tooltip}>
                <Image src="/img/dates/upcoming.svg" alt={locale.nav.upcoming.alt} width={56} height={56} />
            </Link>
            <Link href={"/dates/notice" + getQuery(searchParams)} title={locale.nav.notice.tooltip}>
                <Image src="/img/dates/notice.svg" alt={locale.nav.notice.alt} width={56} height={56} />
            </Link>
        </div>
    )
}

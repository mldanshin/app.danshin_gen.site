"use client";

import dict from '@/dictionaries/ru/dates/dates.json';
import getQuery from "@/helpers/search-params.js";
import Image from 'next/image';
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Nav() {
    const searchParams = useSearchParams();

    return (
        <div className="nav-list">
            <Link href={"/dates/all" + getQuery(searchParams)} title={dict.nav.all.tooltip}>
                <Image src="/img/dates/list.svg" alt={dict.nav.all.alt} width={56} height={56} />
            </Link>
            <Link href={"/dates/upcoming" + getQuery(searchParams)} title={dict.nav.upcoming.tooltip}>
                <Image src="/img/dates/upcoming.svg" alt={dict.nav.upcoming.alt} width={56} height={56} />
            </Link>
            <Link href={"/dates/subscribe" + getQuery(searchParams)} title={dict.nav.subscription.tooltip}>
                <Image src="/img/dates/subscription.svg" alt={dict.nav.subscription.alt} width={56} height={56} />
            </Link>
        </div>
    )
}

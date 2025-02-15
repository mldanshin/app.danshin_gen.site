"use client";

import dict from '@/dictionaries/ru/layout.json';
import getQuery from "@/helpers/search-params";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

export default function HomeNavigation() {
    const searchParams = useSearchParams();

    return (
        <Link href={"/" + getQuery(searchParams)} title={dict.nav.home.tooltip}>
            <Image
                src="/img/layout/logo.svg"
                width={56}
                height={56}
                alt={dict.nav.home.alt}
            />
        </Link>
    )
}

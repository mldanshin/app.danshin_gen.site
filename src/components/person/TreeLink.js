"use client";

import locale from '@/locales/ru/person/person.json';
import getQuery from "@/helpers/search-params.js";
import Image from "next/image";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

export default function TreeLink({ personId }) {
    const searchParams = useSearchParams();

    return (
        <Link href={"/tree/person/" + personId + getQuery(searchParams)} title={locale.button.tree.tooltip}>
            <Image src="/img/tree/tree.svg" alt={locale.button.tree.alt} width="56" height="56" />
        </Link>
    )
}

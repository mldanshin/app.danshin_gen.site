"use client"

import locale from "@/locales/ru/load.json";

export default function Load() {
    return (
        <>
        <div>{locale.loading}</div>
        </>
    )
}

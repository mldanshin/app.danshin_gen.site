"use client";

import locale from "@/locales/ru/tree/tree.json";

export default function Help() {
    return (
        <>
        {
            locale.help.map((item) => (
                <div key={item.key}>
                    <div>{item.value}</div>
                    <div>{item.description}</div>
                </div>
            ))
        }
        </>
    )
}

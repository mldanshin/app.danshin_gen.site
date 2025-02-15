"use client";

import dict from "@/dictionaries/ru/dates/subscription.json";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Unsubscription({ data, userId }) {
    useEffect(() => {
        let timerId = setInterval(async () => {
            const res = await fetch("/api/dates/subscribe/exist?user_id=" + userId);

            if (res.ok) {
                const obj = await res.json();
                if (obj.exist === true) {
                    redirect("/dates/subscribe");
                }
            } else {
                throw new Error("Http status: " + res.status + ". " + "Response text: " + await res.text());
            }

        }, 2000);
        return () => {
            clearInterval(timerId);
        };
    }, [userId]);

    function handleClick() {
        //работает только по https!
        navigator.clipboard.writeText(data.code);
    }

    return (
        <div>
            <p>{dict.instructions[0]}</p>
            <p>
                <span>{dict.instructions[1]}</span>
                <a className="a" href={data.publisherUrl} target="_blank" rel="noopener noreferrer">
                    {dict.instructions[2]}
                </a>
                <span>{dict.instructions[3]}</span>
                <button type="button" title={dict.button_copy.title} onClick={handleClick}>
                    <span className="subscribe-code">{data.code}</span>
                    <span>&nbsp;&nbsp;</span>
                    <Image src="/img/app/copy.svg"
                        alt={dict.button_copy.alt}
                        width={15}
                        height={15}
                        />
                </button>
                <span>{dict.instructions[4]}</span>
            </p>
        </div>
    )
}

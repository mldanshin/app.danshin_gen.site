"use client";

import dict from "@/dictionaries/ru/dates/subscription.json";
import Image from 'next/image';
import { redirect } from "next/navigation";

export default function Subscription({ userId }) {
    async function handleClick() {
        try {
            const response = await fetch("/api/dates/subscribe/delete/?userId=" + userId, {
              method: 'DELETE',
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the delete request:', error);
        }

        redirect("/dates/subscribe");
    }

    return (
        <div className="dates-container">
            <div>{dict.notification}</div>
            <button type="button" title={dict.button_delete.title} onClick={handleClick}>
                <Image src="/img/dates/unsubscribe.svg" alt={dict.button_delete.alt} width={56} height={56} />
            </button>
        </div>
    )
}

"use client"

import dict from '@/dictionaries/ru/auth.json';
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Logout() {
    return (
        <button type="button" title={dict.signout.link.title} onClick={async () => {
            try {
                const response = await fetch("/api/auth/logout");
            
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                console.error('There was a problem with the delete request:', error);
            }

            redirect("/login");
        }}>
            <Image src="/img/auth/logout.svg" alt={dict.signout.img.alt} width={56} height={56} />
        </button>
    )
}

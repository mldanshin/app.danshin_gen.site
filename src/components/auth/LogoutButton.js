"use client";

import locales from "@/locales/ru/layout";
import Image from 'next/image';

export default function LogoutButton() {
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = "/";
            }
        } catch (error) {
        }
    };

    return (
        <button 
            onClick={handleLogout}
            className="logout-button"
            aria-label={locales.logout.button}
        >
            <Image src="/img/auth/logout.svg" alt={locales.logout.button} title={locales.logout.button} width={56} height={56} />
        </button>
    );
}
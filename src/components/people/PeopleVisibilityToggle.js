"use client";

import Image from "next/image";
import PeopleVisibilityContext from '@/contexts/VisibilityContext';
import { useContext } from "react";

export default function PeopleVisibilityToggle() {
    const { changeVisibility } = useContext(PeopleVisibilityContext);

    return (
        <button type="button" onClick={() => changeVisibility()} data-testid="people-visibility-toggle-haeder">
            <Image src="/img/people/toggle.svg" alt="people toggle" width={56} height={56} />
        </button>
    )
}

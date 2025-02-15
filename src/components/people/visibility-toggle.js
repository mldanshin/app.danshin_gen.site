"use client";

import Image from "next/image";
import PeopleVisibilityContext from '@/components/people/visibility-context';
import { useContext } from "react";

export default function PeopleVisibilityToggle() {
    const { changeVisibility } = useContext(PeopleVisibilityContext);

    return (
        <button type="button" onClick={() => changeVisibility()}>
            <Image src="/img/people/toggle.svg" alt="people toggle" width={56} height={56} />
        </button>
    )
}

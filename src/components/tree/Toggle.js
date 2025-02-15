"use client";

import getQuery from "@/helpers/search-params.js";
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

export default function Toggle({ personId, toggle, locale, onChange }) {
    const [parentId, setParentId] = useState(toggle.parentTarget);
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleChange(event) {
        let id = event.currentTarget.value;
        setParentId(id);

        onChange(id);

        router.push("/tree/person/" + personId + "/" + id + getQuery(searchParams));
    }

    if (toggle.parentList.length > 0) {
        return (
            <div className="tree-toggle-container">
                <span>{locale.toggle}</span>
                <select className="tree-toggle" onChange={handleChange} value={parentId}>
                    {
                        toggle.parentList.map(
                            parent =>
                            <option
                                key={"tree_toggle_parent_" + parent.id}
                                value={parent.id}
                            >
                                {parent.surname ? parent.surname : locale.person.surname.unknown}
                                {" "}
                                {parent.name ? parent.name : locale.person.name.unknown}
                                {" "}
                                {parent.patronymic ? parent.patronymic : locale.person.patronymic.unknown}
                            </option>
                        )
                    }
                </select>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

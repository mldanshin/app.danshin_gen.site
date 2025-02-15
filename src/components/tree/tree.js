"use client";

import dict from "@/dictionaries/ru/tree/tree.json";
import getQuery from "@/helpers/search-params.js";
import Help from "./help";
import Image from "next/image";
import Link from "next/link";
import ThemeContext from '@/components/theme/theme-context';
import Toggle from "@/components/tree/toggle.js";
import { useContext } from "react";
import { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";

export default function Tree({ personId, toggle, image }) {
    const router = useRouter();

    const searchParams = useSearchParams();

    const htmlImage = { __html: image};

    const [parentId, setParentId] = useState(toggle.parentTarget);
    const [showHelp, setShowHelp] = useState(false);

    const { theme } = useContext(ThemeContext);

    function handleClick(event) {
        const path = event.target.dataset.path

        if (path) {
            router.push(path + getQuery(searchParams))
        }
    }

    function handleChange(parentId) {
        setParentId(parentId)
    }

    async function handleClickHelp() {
        setShowHelp(!showHelp)
    }

    const query = "?person_id=" + personId + (parentId ? "&parent_id=" + parentId : "");

    return (
        <div>
            <div>
                <h2>
                    <span>{dict.title}</span>
                    <span> </span>
                    <span>{toggle.personTarget.surname ? toggle.personTarget.surname : dict.person.surname.unknown}</span>
                    <span> </span>
                    <span>{toggle.personTarget.name ? toggle.personTarget.name : dict.person.name.unknown}</span>
                    <span> </span>
                    <span>{toggle.personTarget.patronymic ? toggle.personTarget.patronymic : dict.person.patronymic.unknown}</span>
                </h2>
                <Toggle personId={personId} toggle={toggle} dict={dict} onChange={handleChange} />
                <div className="nav-list">
                    {/**Не доступен функционал, поэтому отключено */}
                    {/*<button title={dict.button.help.tooltip} onClick={handleClickHelp}>
                        <Image src="/img/tree/help.svg" alt={dict.button.help.alt} width="56" height="56" />
                    </button>*/}
                    <Link href={"/tree/window" + query} target="_blank" title={dict.link.window.tooltip}>
                        <Image src={theme.iconShowTree} alt="open window" width="56" height="56" />
                    </Link>
                    <a href={"/download/tree" + query} title={dict.link.download.tooltip}>
                        <Image src={theme.iconDownloadTree} alt="download tree" width="56" height="56" />
                    </a>
                    <Link href={"/person/" + personId + query} title={dict.link.person.tooltip}>
                        <Image src="/img/person/card.svg" alt="open person card" width="56" height="56" />
                    </Link>
                </div>
                {showHelp && <Help></Help>}
                <small>({dict.info})</small>
            </div>
            <div id="tree-object-container" className="tree-object-container" dangerouslySetInnerHTML={htmlImage} onClick={handleClick}></div>
        </div>
    )
}

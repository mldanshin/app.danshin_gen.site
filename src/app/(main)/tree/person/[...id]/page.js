"use server";

import getImage from "@/repositories/tree/tree.js";
import getToggle from "@/repositories/tree/toggle.js";
import Tree from "@/components/tree/tree";
import { Suspense } from 'react';
import UnexpectedError from "@/components/unexpected_error";

export default async function Page({ params }) {
    const paramsVar = (await params);
    const personId = paramsVar.id[0];
    const parentId = paramsVar.id[1];

    const toggle = await getToggle(personId, parentId);
    if (toggle === null) {
        return (
            <UnexpectedError />
        );
    }

    const image = await getImage(personId, toggle.parentTarget);
    if (image === null) {
        return (
            <UnexpectedError />
        );
    }

    return (
        <Suspense>
            <Tree personId={personId} toggle={toggle} image={image} />
        </Suspense>
    )
}

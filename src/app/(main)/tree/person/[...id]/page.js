"use server";

import { getAccessToken } from '@/lib/cookies';
import { getTreeToggle } from "@/services/tree.js";
import { getTreeImage } from "@/services/tree.js";
import Tree from "@/components/tree/Tree";
import { Suspense } from 'react';
import UnexpectedError from "@/components/UnexpectedError";

export default async function Page({ params }) {
    const token = await getAccessToken();
    const paramsVar = (await params);
    const personId = paramsVar.id[0];
    const parentId = paramsVar.id[1];

    const toggle = await getTreeToggle(personId, parentId, token);
    if (toggle === null) {
        return (
            <UnexpectedError />
        );
    }

    const image = await getTreeImage(personId, toggle.parentTarget, token);
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

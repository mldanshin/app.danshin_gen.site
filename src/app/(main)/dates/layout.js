"use server";

import Nav from "@/components/dates/nav.js";
import { Suspense } from 'react';

export default async function Dates({ children }) {
    return (
        <div>
            <Suspense>
                <Nav/>
                {children}
            </Suspense>
        </div>
    )
}

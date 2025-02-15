"use server";

import Nav from "@/components/dates/Nav.js";
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

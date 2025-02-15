"use server";

import getData from "@/repositories/dates/subscription-data.js";
import existsSubscription from "@/repositories/dates/subscription-exists.js";
import Unsubscription from "@/components/dates/unsubscription.js";
import Subscription from "@/components/dates/subscription.js";
import { verifySession } from '@/utils/dal';
import UnexpectedError from "@/components/unexpected_error";

export default async function Page() {
    const session = await verifySession();
    const userId = session.userId;

    const res = await existsSubscription(userId);
    if (res === null) {
        return (
            <UnexpectedError />
        );
    }
    const obj = await res.json();

    if (obj.exist === true) {
        return (
            <Subscription userId={userId}/>
        )
    } else {
        const data = await getData(userId);
        if (data === null) {
            return (
                <UnexpectedError />
            );
        }

        return (
            <Unsubscription data={data} userId={userId}/>
        )
    }    
}

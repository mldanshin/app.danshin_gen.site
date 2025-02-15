import SignupForm from "@/components/auth/signup-form";
import { Suspense } from 'react';

export default function Login() {
    return (
        <Suspense>
            <SignupForm />
        </Suspense>
    )
}

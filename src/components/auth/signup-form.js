'use client'

import dict from "@/dictionaries/ru/auth.json"
import dictLayout from "@/dictionaries/ru/layout.json"
import { signup } from '@/utils/signup'
import { useActionState } from 'react'
import { useSearchParams } from "next/navigation";

export default function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)

    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect')

    return (
        <div className="container">
            <form className="form" action={signup} method="POST">
                <input type="hidden" name="redirect" value={redirect ?? ""} />

                <label htmlFor="name">{ dict.login.form.name.label }</label>
                <input id="name" name="name" type="text" />
                {state?.errors?.name && <p>{state.errors.name}</p>}

                <label htmlFor="password">{ dict.login.form.password.label }</label>
                <input id="password" name="password" type="password" />
                {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error) => (
                        <li key={error}>- {error}</li>
                        ))}
                    </ul>
                    </div>
                )}

                <button className="submit" disabled={pending} type="submit">
                    { dict.login.form.signin.label }
                </button>
            </form>
            <a href={ process.env.NEXT_PUBLIC_DANSHIN_ID_REG + "?client_url=" + process.env.NEXT_PUBLIC_SITE_URL }>
                { dict.registration.link }
            </a>
            <a href={ process.env.NEXT_PUBLIC_DANSHIN_ID_EDIT } target="__blank">
                { dict.profile.link }
            </a>
            <div className="info">
                <small>
                    { dict.login.info1 }
                </small>
            </div>
            <div className="info">
                <small>
                    { dict.login.info2 }
                </small>
                <a href={"mailto:" + dictLayout.autor.email} rel="nofollow">{dictLayout.autor.email}</a>
            </div>
            <div className="info">
                <small>
                    { dict.login.info3 }
                </small>
                <a href={"mailto:" + dictLayout.autor.email} rel="nofollow">{dictLayout.autor.email}</a>
            </div>
        </div>
    )
}

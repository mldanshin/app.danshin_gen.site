"use server"

import { createSession } from '@/lib/session'
import { SignupFormSchema } from '@/lib/zod'
import { redirect } from 'next/navigation'

export async function signup(formData) {
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 3. user identification
    const { name, password } = validatedFields.data
    const data = {
        name: name,
        password: password,
    };

    const res = await fetch(process.env.DANSHIN_ID_URL + '/api/user', {
        method: 'POST',
        body: new URLSearchParams(data).toString(),
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.DANSHIN_ID_API_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    });

    let user = null;

    if (res.ok) {
        user = await res.json();
        
        if (user.isUnconfirmed === false) {
            return {
                message: 'An error occurred while creating your account.',
            }
        }

        if (!user.access.includes("genealogy")) {
            return {
                message: 'An error occurred while creating your account.',
            }
        }
    }

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    // 4. Create user session
    await createSession(user.id)

    // 5. Redirect user
    if (formData.get('redirect')) {
        redirect(formData.get('redirect'))
    } else {
        redirect('/')
    }
}

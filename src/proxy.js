import { NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
 
const protectedRoutes = [
    //Ещё проверка на сессию в главном layout
    //(на всякий случай, тк динамические роуты в ручную проверял)
    '/',
    '/api/dates/subscribe/delete',
    '/api/dates/subscribe/exist',
    '/api/people',
    '/api/photo',
    "/dates/all",
    "/dates/subscribe",
    "/dates/upcoming",
    "/download/db",
    "/download/people",
    "/download/person",
    "/download/photo",
    "/download/tree",
    "/tree/window",
]
const publicRoutes = ['/login']
 
export default async function proxy(req) {
    const path = req.nextUrl.pathname
    
    const isProtectedRoute = hasProtectedRoute(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(
            new URL('/login?redirect=' + path, req.nextUrl)
        )
    }

    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    
    return NextResponse.next()
}

function hasProtectedRoute(path) {
    if (protectedRoutes.includes(path)) {
        return true;
    }

    if (path.indexOf("/person/") === 0) {
        return true;
    }

    if (path.indexOf("/tree/person/") === 0) {
        return true;
    }

    return false;
}

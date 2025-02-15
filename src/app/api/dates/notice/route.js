import { getServerToken } from '@/lib/auth';
import locale from '@/locales/ru/dates/notice'
import { NextResponse } from 'next/server';
import { saveNotice } from '@/services/dates'

export async function POST(request) {
  try {
    const token = await getServerToken();
    
    if (!token) {
      return NextResponse.json({
        message: locale.save.unauthorized,
        type: 'error'
      }, { status: 401 });
    }

    const body = await request.json();
    const { sendTime, dayAfter, dayBefore, dates } = body;
    
    if (!sendTime || !dayAfter || !dayBefore || !dates) {
      return NextResponse.json({
        message: locale.save.bad_request,
        type: 'error'
      }, { status: 400 });
    }

    const response = await saveNotice(body, token);
    if (response || response.status == 201) {
      return NextResponse.json({
        message: locale.save.ok,
        type: 'success'
      }, { status: 200 });
    }
    return NextResponse.json({
        message: "Server Error",
        type: 'error'
    }, { status: 500 });
  } catch (error) {
    console.log('Server Error', error);
    return NextResponse.json({
      message: "Server Error",
      type: 'error'
    }, { status: 500 });
  }
}

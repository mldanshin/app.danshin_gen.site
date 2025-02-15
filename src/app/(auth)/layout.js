"use server";

import '@/style/auth.css';
import dict from '@/dictionaries/ru/layout.json';

export async function generateMetadata({ params }) {
  return {
    title: dict.title,
    description: '',
    icons: {
      icon: '/favicon.svg'
    },
  }
}

export default async function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className='body'>{children}</body>
    </html>
  )
}

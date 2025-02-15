"use server";

import '@/styles/globals.css';
import Image from 'next/image';
import locale from '@/locales/ru/layout.json';
import Link from 'next/link';
import Load from '@/components/Loading';
import { Suspense } from 'react';
import themes from '@/config/themes.json';
import Wrapper from '@/components/Wrapper';

export async function generateMetadata({ params }) {
  return {
    title: locale.title,
    description: '',
    icons: {
      icon: '/favicon.svg'
    },
  }
}

export default async function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={"body " + themes.dark.className}>
        <Suspense fallback={<ContentSkeleton />}>
          <Wrapper>
            {children}
          </Wrapper>
        </Suspense>
        <footer>
          <div className="footer">
            <div className="footer-git-list">
              <Link href="https://github.com/mldanshin/danshin_gen.front.git" target='_blank' rel="noopener noreferrer" title={locale.code.front}>
                <Image src="/img/layout/github-dark.svg" alt="github" width={56} height={56} />
              </Link>
              <Link href="https://github.com/mldanshin/danshin_gen.api.git" target='_blank' rel="noopener noreferrer" title={locale.code.api}>
                <Image src="/img/layout/github-dark.svg" alt="github" width={56} height={56} />
              </Link>
            </div>
            <div className="footer-author">
              <div>{locale.autor.role} {locale.autor.name}</div>
              <span>2021-{new Date().getFullYear()}</span>
            </div>
            <address className="">
              <a className="" href={"mailto:" + locale.autor.email} rel="nofollow">{locale.autor.email}</a>
            </address>
          </div>
        </footer>
      </body>
    </html>
  )
}

function ContentSkeleton() {
  return (
    <div className='content_skeleton'>
      <Load />
    </div>
  );
}

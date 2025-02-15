"use server";

import '@/style/globals.css';
import dict from '@/dictionaries/ru/layout.json';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import themes from '@/components/theme/themes.json';
import Wrapper from '@/components/wrapper';
import { verifySession } from '@/utils/dal';

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
  const session = await verifySession();
  if (!session) return null;

  return (
    <html lang="ru">
      <body className={"body " + themes.dark.className}>
        <Suspense>
          <Wrapper>
            {children}
          </Wrapper>
        </Suspense>
        <footer>
          <div className="footer">
            <div className="footer-git-list">
              <Link href="https://github.com/mldanshin/danshin_gen.front.git" target='_blank' rel="noopener noreferrer" title={dict.code.front}>
                <Image src="/img/layout/github-dark.svg" alt="github" width={56} height={56} />
              </Link>
              <Link href="https://github.com/mldanshin/danshin_gen.api.git" target='_blank' rel="noopener noreferrer" title={dict.code.api}>
                <Image src="/img/layout/github-dark.svg" alt="github" width={56} height={56} />
              </Link>
              <Link href="https://github.com/mldanshin/danshin_gen.admin.git" target='_blank' rel="noopener noreferrer" title={dict.code.admin}>
                <Image src="/img/layout/github-dark.svg" alt="github" width={56} height={56} />
              </Link>
            </div>
            <div className="footer-author">
                <div>{dict.autor.role} {dict.autor.name}</div>
                <span>2021-{new Date().getFullYear()}</span>
            </div>
            <address className="">
                <a className="" href={"mailto:" + dict.autor.email} rel="nofollow">{dict.autor.email}</a>
            </address>
          </div>
        </footer>
      </body>
    </html>
  )
}

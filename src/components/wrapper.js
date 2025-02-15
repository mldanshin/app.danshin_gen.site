"use client";

import DatesLink from "@/components/dates/navigation-link";
import DownloadDB from '@/components/download/db';
import DownloadPeople from '@/components/download/people';
import DownloadPhoto from '@/components/download/photo';
import HomeNavigation from "@/components/home-navigation";
import Logout from "@/components/auth/logout";
import People from '@/components/people/people';
import PeopleVisibilityToggle from '@/components/people/visibility-toggle';
import { Suspense } from 'react';
import ThemeProvider from '@/components/theme/theme-provider';
import ThemeToggle from '@/components/theme/theme-toggle';
import VisibilityProvider from '@/components/people/visibility-provider';

export default function Wrapper({ children }) {
    return (
        <>
        <ThemeProvider>
          <VisibilityProvider>
            <header className="header">
              <nav>
                <HomeNavigation />
              </nav>
              <nav className="header-nav-center">
                <PeopleVisibilityToggle />
                <DownloadDB />
                <DownloadPeople />
                <DownloadPhoto />
                <Suspense>
                  <DatesLink />
                </Suspense>
              </nav>
              <div className="header-nav-end">
                <Logout />
                <ThemeToggle />
              </div>
            </header>
            <div className="content">
              <Suspense>
                <People />
              </Suspense>
              <main className="main" id="main">
                {children}
              </main>
            </div>
          </VisibilityProvider>
        </ThemeProvider>
        </>
    );
}
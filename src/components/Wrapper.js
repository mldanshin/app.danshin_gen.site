"use client";

import DatesLink from "@/components/dates/DatesLink";
import DownloadDB from '@/components/download/DownloadDB';
import DownloadPeople from '@/components/download/DownloadPeople';
import DownloadPhoto from '@/components/download/DownloadPhoto';
import HomeNavigation from "@/components/HomeNavigation";
import People from '@/components/people/People';
import PeopleVisibilityToggle from '@/components/people/PeopleVisibilityToggle';
import { Suspense } from 'react';
import ThemeProvider from '@/providers/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import VisibilityProvider from '@/providers/VisibilityProvider';
import LogoutButton from "@/components/auth/LogoutButton";

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
                <LogoutButton />
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
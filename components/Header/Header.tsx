'use client';

import Link from 'next/link';
import css from './Header.module.css';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

export function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

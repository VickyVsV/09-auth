import type { Metadata } from "next";
import css from './Home.module.css';

export const metadata: Metadata = {
  title: "Page not found — NoteHub",
  description: "This page does not exist in NoteHub.",
  openGraph: {
    title: "Page not found — NoteHub",
    description: "This page does not exist in NoteHub.",
    url: "https://notehub.com/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;

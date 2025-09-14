import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? 'All' : slug?.[0] ?? 'All';
  return {
    title: `Filter: ${tag} — NoteHub`,
    description: `Notes filtered by tag: ${tag}.`,
    openGraph: {
      title: `Filter: ${tag} — NoteHub`,
      description: `Notes filtered by tag: ${tag}.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}
export default async function NotesPage({ params }: Props) {
  /* const tag = params.slug?.[0] || null; */
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? null : (slug?.[0] ?? null);
  // SSR загрузка первой страницы без поиска
  const initialData = await fetchNotes('', 1, 12);

  return <Notes initialData={initialData} tag={tag} />;
}

import type { NoteTag } from '@/types/note';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from "next";

/* const staticTags: NoteTag[] = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Todo',
];

export const getTags = async (): Promise<NoteTag[]> => {
  return staticTags;
}; */

const staticTags: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export const metadata: Metadata = {
  title: 'Create a Note — NoteHub',
  description: 'Page for creating a new note in NoteHub.',
  openGraph: {
    title: 'Create a Note — NoteHub',
    description: 'Create a new note in NoteHub.',
    url: 'https://notehub.com/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const CreateNote = async () => {
  const allTags = staticTags;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={allTags} />
      </div>
    </main>
  );
};

export default CreateNote;

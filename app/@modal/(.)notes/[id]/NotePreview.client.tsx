'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getSingleNoteClient } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.client.module.css';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNoteClient(id),
  });

  const handleClose = () => {
    router.back(); // вернёт на список
  };

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <p className={css.loading}>Loading note...</p>
      </Modal>
    );
  if (error || !note)
    return (
      <Modal onClose={handleClose}>
        <p className={css.error}>Error loading note: {error?.message ?? 'Unknown error occurred.'}</p>
        <button onClick={handleClose}>Close</button>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <button onClick={handleClose}>Close</button>
    </Modal>
  );
}

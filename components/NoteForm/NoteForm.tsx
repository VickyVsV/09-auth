'use client';

import { useRouter } from 'next/navigation';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NewNote } from '@/types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useState } from 'react';

type Props = {
  tags: NoteTag[];
};

const TAGS: NoteTag[] = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const NoteForm = ({ tags }: Props) => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const [error, setError] = useState('');

  const handleSubmit = (formData: FormData) => {
    const rawValues = Object.fromEntries(formData) as Record<string, string>;
    // проверяем, что tag корректный, иначе подставляем дефолтный
    const tag: NoteTag = TAGS.includes(rawValues.tag as NoteTag)
      ? (rawValues.tag as NoteTag)
      : 'Todo';

    const values: NewNote = {
      title: rawValues.title,
      content: rawValues.content,
      tag,
    };

    if (!values.title || !values.content) {
      setError('Title and content cannot be empty!');
      return;
    }

    setError('');

    mutate(values);
  };

  const handleCancel = () => router.push('/notes/filter/all');

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {error && <p className={css.error}>{error}</p>}

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
      </div>
    </form>
  );
};

export default NoteForm;

/*   const handleSubmit = (formData: FormData) => {
    const raw = Object.fromEntries(formData) as Record<string, string>;
    const newNote: NewNote = {
      title: raw.title,
      content: raw.content,
      tag: raw.tag as NoteTag,
    };
    mutate(newNote);
  }; */

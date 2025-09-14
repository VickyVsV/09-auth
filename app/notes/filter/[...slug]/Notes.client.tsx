'use client';
import css from './NotesPage.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';
import type { GetNote } from '@/lib/api';
import Link from 'next/link';

interface NotesProps {
  initialData: GetNote;
  tag: string | null; // SSR данные приходят отсюда
}

export default function NotesPage({ initialData, tag }: NotesProps) {
  const [searchValue, setSearchValue] = useState('');

  const [searchValueDebonce] = useDebounce(searchValue, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const { data, isLoading } = useQuery<GetNote>({
    queryKey: ['notes', searchValueDebonce, currentPage, tag],
    queryFn: () =>
      fetchNotes(searchValueDebonce, currentPage, perPage, tag || undefined),
    placeholderData: keepPreviousData,
    initialData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {}
          <SearchBox value={searchValue} onChange={handleChange} />
          {
            <Link href="/notes/action/create" className={css.button}>
              Create note +
            </Link>
          }
        </header>
        {data && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage - 1}
            onPageChange={selectedPage => setCurrentPage(selectedPage + 1)}
          />
        )}
        {!isLoading && data && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}

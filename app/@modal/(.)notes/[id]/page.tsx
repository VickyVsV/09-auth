import React from 'react';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getSingleNoteClient } from '@/lib/api/clientApi';
import NotePreview from './NotePreview.client';

type Props = {
  params: Promise<{ id: string }>;
};

const PreviewPage = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNoteClient(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
};

export default PreviewPage;

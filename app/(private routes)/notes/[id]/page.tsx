import type { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { getSingleNoteServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
  const { id } = await params;
  const note = await getSingleNoteServer(id);

  return {
    title: `${note.title} — NoteHub`,
    description: note.content.slice(0, 100) + "...",
    openGraph: {
      title: `${note.title} — NoteHub`,
      description: note.content.slice(0, 100) + "...",
      url: `https://notehub.com/notes/${id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNoteServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;

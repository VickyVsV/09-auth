export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface GetNotesResponse {
  notes: Note[]; // массив заметок
  totalPages: number; // всего страниц (для пагинации)
  total: number;
}

export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";


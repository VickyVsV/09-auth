import axios from 'axios';
import { api } from './api';
import type { Note, NewNote, GetNotesResponse } from '@/types/note';
import type { User } from '@/types/user';
import { cookies } from 'next/headers';

/** Возвращает объект headers с cookie (если есть) */
async function getCookieHeaders() {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).toString(); // строка cookie: "a=1; b=2" или ""
  return cookieHeader ? { cookie: cookieHeader } : {};
}

/* ----------------- Auth ----------------- */
export async function getSessionServer(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/auth/session', {
      headers: await getCookieHeaders(),
    });
    return data ?? null;
  } catch {
    return null;
  }
}

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

/* ----------------- User ----------------- */
/* export async function getUserProfileServer(): Promise<User> {
  try {
    const { data } = await api.get<User>("/users/me", {
      headers: await getCookieHeaders(),
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) throw new Error(err.response?.data?.message || err.message);
    throw new Error("Failed to fetch user profile (server)");
  }
} */


//явно сообщает Next.js, что страница зависит от заголовков запроса
export async function getUserProfileServer(): Promise<User> {
  try {
    const cookieStore = cookies();
    const headers = {
      Cookie: cookieStore.toString(),
    };
    const { data } = await api.get<User>('/users/me', {
      headers: headers,
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to fetch user profile (server)');
  }
}

export async function updateUserProfileServer(
  payload: Partial<User>
): Promise<User> {
  try {
    const { data } = await api.patch<User>('/users/me', payload, {
      headers: await getCookieHeaders(),
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to update user profile (server)');
  }
}

/* ----------------- Notes ----------------- */
export async function fetchNotesServer(
  search = '',
  page = 1,
  perPage = 12,
  tag?: string
): Promise<GetNotesResponse> {
  try {
    const { data } = await api.get<GetNotesResponse>('/notes', {
      params: { search, page, perPage, tag },
      headers: await getCookieHeaders(),
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to fetch notes (server)');
  }
}

export async function getSingleNoteServer(id: string): Promise<Note> {
  try {
    const { data } = await api.get<Note>(`/notes/${id}`, {
      headers: await getCookieHeaders(),
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to fetch note (server)');
  }
}

export async function createNoteServer(newNote: NewNote): Promise<Note> {
  try {
    const { data } = await api.post<Note>('/notes', newNote, {
      headers: await getCookieHeaders(),
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to create note (server)');
  }
}

export async function deleteNoteServer(id: string): Promise<Note> {
  try {
    const { data } = await api.delete<Note>(`/notes/${id}`, {
      headers: await getCookieHeaders(),
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to delete note (server)');
  }
}

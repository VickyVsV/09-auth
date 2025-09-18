import { api } from './api';
import axios from 'axios';
import type { Note, NewNote, GetNotesResponse } from '../../types/note';
import type { User, RegisterData, LoginData } from '../../types/user';

/* ----------------- Auth ----------------- */
export async function registerUser(data: RegisterData): Promise<User> {
  try {
    const { data: user } = await api.post<User>('/auth/register', data);
    return user;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Register failed');
  }
}

export async function loginUser(data: LoginData): Promise<User> {
  try {
    const { data: user } = await api.post<User>('/auth/login', data);
    return user;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Login failed');
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Logout failed');
  }
}

export async function getSessionClient(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/auth/session');
    return data ?? null;
  } catch {
    return null;
  }
}

/* ----------------- User ----------------- */
/* export async function getUserProfileClient(): Promise<User> {
  try {
    const { data } = await api.get<User>("/users/me");
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) throw new Error(err.response?.data?.message || err.message);
    throw new Error("Failed to fetch user profile");
  }
} */

export async function getUserProfileClient(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/users/me');
    return data;
  } catch (error) {
    // Проверяем, что это ошибка от axios
    if (axios.isAxiosError(error)) {
      // Если сервер ответил статусом 401 (Unauthorized),
      // это нормальная ситуация для гостя. Просто возвращаем null.
      if (error.response?.status === 401) {
        return null;
      }
    }
    // Если произошла другая, неожиданная ошибка,
    // мы можем вывести её в консоль для отладки, но всё равно вернём null,
    // чтобы приложение не падало.
    console.error('Failed to fetch user profile:', error);
    return null;
  }
}

export async function updateUserProfileClient(
  payload: Partial<User>
): Promise<User> {
  try {
    const { data } = await api.patch<User>('/users/me', payload);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to update user profile');
  }
}

/* ----------------- Notes ----------------- */
export async function fetchNotesClient(
  search = '',
  page = 1,
  perPage = 12,
  tag?: string
): Promise<GetNotesResponse> {
  try {
    const { data } = await api.get<GetNotesResponse>('/notes', {
      params: { search, page, perPage, tag },
    });
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to fetch notes');
  }
}

export async function getSingleNoteClient(id: string): Promise<Note> {
  try {
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to fetch note');
  }
}

export async function createNoteClient(newNote: NewNote): Promise<Note> {
  try {
    const { data } = await api.post<Note>('/notes', newNote);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to create note');
  }
}

export async function deleteNoteClient(id: string): Promise<Note> {
  try {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw new Error(err.response?.data?.message || err.message);
    throw new Error('Failed to delete note');
  }
}

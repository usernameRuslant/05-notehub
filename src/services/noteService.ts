import axios from 'axios';
import type { NewNote, Note } from '../types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
});

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const { data } = await instance.get<FetchNotesResponse>('/notes', {
    params: {
      perPage: 12,
      page,
      search,
    },
  });

  return data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};

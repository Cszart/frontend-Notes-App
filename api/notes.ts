import axios from "axios";
import { NoteI } from "../interfaces";

export const post_notes_create = async (data: NoteI): Promise<any> => {
  const add_response = await axios.post<NoteI>(
    `${process.env.NEXT_PUBLIC_API_URL}/notes`,
    data
  );

  const add_data = add_response.data;
  return add_data;
};

export const get_notes_all = async (): Promise<any> => {
  const all_notes_response = await axios.get<NoteI[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/all`
  );

  const notes_data = all_notes_response.data;
  return notes_data;
};

export const get_notes_byID = async (id: string): Promise<any> => {
  const notes_byID_response = await axios.get<NoteI>(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`
  );

  const note_data = notes_byID_response.data;
  return note_data;
};

export const get_notes_archived = async (archived: boolean): Promise<any> => {
  const archived_notes_response = await axios.get<NoteI[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/archived/${archived}`
  );

  const notes_data = archived_notes_response.data;
  return notes_data;
};

export const get_notes_category = async (categoryID: boolean): Promise<any> => {
  const category_notes_response = await axios.get<NoteI[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/category/${categoryID}`
  );

  const notes_data = category_notes_response.data;
  return notes_data;
};

export const put_notes_update = async (
  id: number,
  data: NoteI
): Promise<any> => {
  const update_response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
    data
  );
  return update_response;
};

export const put_notes_archive = async (id: number): Promise<any> => {
  const update_response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/archive/${id}`
  );
  return update_response;
};

export const delete_note = async (id: number): Promise<any> => {
  const notes_byID_response = await axios.delete<any>(
    `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`
  );
  return notes_byID_response;
};

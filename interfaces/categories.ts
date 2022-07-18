import { NoteI } from "./notes";

// Basic structure
export interface CategoryI {
  id: number;
  name: string;

  notes?: NoteI[];
}

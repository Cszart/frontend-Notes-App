import { CategoryI } from "./categories";

export interface NoteDetailsProps {
  isOpen: boolean;
  hide: () => void;

  typeAction: "update" | "create";
  titleModal: string;
  noteData?: NoteI;

  isArchiving?: boolean;
  handler_archieve?: () => Promise<void>;

  isDeleting?: boolean;
  handler_delete?: () => Promise<void>;

  refetchData: () => void;
}

export interface NoteProps {
  noteData: NoteI;

  refetchData: () => void;
}

// Basic structure
export interface NoteI {
  id?: number;
  title: string;
  text: string;
  archived: boolean;

  createdAt?: Date;

  categories: CategoryI[];
}

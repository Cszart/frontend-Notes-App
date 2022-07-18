import { CategoryI } from "./categories";

export interface NoteDetailsProps {
  isOpen: boolean;
  hide: () => void;

  typeAction: "update" | "create";
  titleModal: string;
  noteData?: NoteI;

  categoriesAllData?: CategoryI[];
  initCategories?: string[];

  isArchiving?: boolean;
  handler_archieve?: () => Promise<void>;

  isDeleting?: boolean;
  handler_delete?: () => Promise<void>;

  refetchData: () => Promise<any>;
  refetchCategories: () => Promise<any>;
}

export interface NoteProps {
  noteData: NoteI;
  categoriesAllData?: CategoryI[];

  refetchData: () => Promise<any>;
  refetchCategories: () => Promise<any>;
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

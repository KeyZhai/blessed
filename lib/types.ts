// 笔记数据类型
export interface NoteData {
  title: string;
  content: string;
  updateTime: Date;
}

// 所有笔记的类型 (Redis哈希结构)
export interface Notes {
  [key: string]: string;
}

// 解析后的单个笔记类型
export interface ParsedNote {
  title: string;
  content: string;
  updateTime: string;
}

// SidebarNoteItem 组件的 props 类型
export interface SidebarNoteItemProps {
  noteId: string;
  note: string;
}

// NoteList 组件的 props 类型
export interface NoteListProps {
  notes: Notes;
}

export interface StrapiNoteData {
  id: number;
  title: string;
  content: string;
  slug: string;
  updatedAt: string;
}

export interface StrapiNotesResponse {
  data: StrapiNoteData[];
}

export interface StrapiSingleNoteResponse {
  data: StrapiNoteData;
}

// 从 Strapi 获取的笔记（包含 id）
export interface StrapiNote {
  id: number;
  title: string;
  content: string;
  updateTime: string;
}

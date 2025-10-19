// 笔记数据类型
export interface NoteData {
  title: string;
  content: string;
  updateTime: string;
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

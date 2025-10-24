import SidebarNoteListFilter from "@/components/Sidebar/SidebarNoteListFilter";
import { getAllNotes } from "@/lib/redis";

export default async function SidebarNoteList() {
  const notes = await getAllNotes();

  if (Object.entries(notes).length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <p className="text-sm text-gray-500">还没有笔记</p>
        <p className="text-xs text-gray-400 mt-1">
          点击右上角 + 创建第一条笔记
        </p>
      </div>
    );
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: null, // 不再需要单独的 header
        };
      })}
    />
  );
}

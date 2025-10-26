import SidebarNoteItemContent from "@/components/Sidebar/SidebarNoteItemContent";
import SidebarNoteItemHeader from "@/components/Sidebar/SidebarNoteItemHeader";
import type { SidebarNoteItemProps } from "@/lib/types";

export default function SidebarNoteItem({
  noteId,
  note,
}: SidebarNoteItemProps) {
  const parsedNote = JSON.parse(note);
  const { title, content = "", updateTime } = parsedNote;
  return (
    <SidebarNoteItemContent id={noteId} title={title}>
      <SidebarNoteItemHeader
        title={title}
        updateTime={updateTime}
        content={content}
      />
    </SidebarNoteItemContent>
  );
}

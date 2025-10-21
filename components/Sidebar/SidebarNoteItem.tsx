import dayjs from "dayjs";
import SidebarNoteItemContent from "@/components/Sidebar/SidebarNoteItemContent";
import type { SidebarNoteItemProps } from "@/lib/types";

export default function SidebarNoteItem({
  noteId,
  note,
}: SidebarNoteItemProps) {
  const parsedNote = JSON.parse(note);
  const { title, content = "", updateTime } = parsedNote;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }
    >
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format("YYYY-MM-DD hh:mm:ss")}</small>
      </header>
    </SidebarNoteItemContent>
  );
}

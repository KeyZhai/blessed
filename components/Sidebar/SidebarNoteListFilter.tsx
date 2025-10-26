"use client";

import { useSearchParams } from "next/navigation";
import SidebarNoteItemContent from "@/components/Sidebar/SidebarNoteItemContent";
import SidebarNoteItemHeader from "@/components/Sidebar/SidebarNoteItemHeader";

interface SidebarNoteListProps {
  notes: {
    noteId: string;
    note: {
      title: string;
      content: string;
      updateTime: Date;
    };
    header: React.ReactNode;
  }[];
}

export default function SidebarNoteListFilter({ notes }: SidebarNoteListProps) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");

  return (
    <ul className="flex flex-col gap-1 px-2 py-2">
      {notes.map((noteItem) => {
        const { noteId, note } = noteItem;
        if (
          !searchText ||
          (searchText &&
            note.title.toLowerCase().includes(searchText.toLowerCase()))
        ) {
          return (
            <li key={noteId}>
              <SidebarNoteItemContent id={noteId} title={note.title}>
                <SidebarNoteItemHeader
                  title={note.title}
                  updateTime={note.updateTime}
                  content={note.content}
                />
              </SidebarNoteItemContent>
            </li>
          );
        }

        return null;
      })}
    </ul>
  );
}

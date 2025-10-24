import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "@/components/Sidebar/SidebarNoteList";
import NoteListSkeleton from "@/components/Sidebar/NoteListSkeleton";
import SidebarSearchField from "@/components/Sidebar/SidebarSearchField";
import { useTranslation } from "@/app/i18n/index";
import AddNote from "@/components/Note/AddNote";

export default async function Sidebar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <section className="col sidebar flex flex-col h-full bg-white shadow-sm">
        {/* Header */}
        <Link
          href={"/"}
          className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <Image
            className="flex-shrink-0"
            src="/logo.svg"
            width={24}
            height={22}
            alt=""
            role="presentation"
          />
          <strong className="text-lg font-bold text-gray-900">
            Less Typing
          </strong>
        </Link>

        {/* Search and Add */}
        <section
          className="flex items-center gap-2 px-3 py-3 border-b border-gray-100"
          role="menubar"
        >
          <div className="flex-1">
            <SidebarSearchField lng={lng} />
          </div>
          <AddNote />
        </section>

        {/* Notes List */}
        <nav className="flex-1 overflow-y-auto">
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}

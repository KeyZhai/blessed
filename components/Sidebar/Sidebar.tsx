import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from "@/components/Sidebar/SidebarNoteList";
import EditButton from "@/components/Note/EditButton";
import NoteListSkeleton from "@/components/Sidebar/NoteListSkeleton";
import SidebarSearchField from "@/components/Sidebar/SidebarSearchField";
import SidebarImport from "@/components/Sidebar/SidebarImport";
import { useTranslation } from "@/app/i18n/index";

export default async function Sidebar({ lng }: { lng: string }) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <Image
              className="logo"
              src="/logo.svg"
              width={22}
              height={20}
              alt=""
              role="presentation"
            />
            <strong>Less Typing</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField lng={lng} />
          <EditButton noteId={null}>{t("new")}</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
        <SidebarImport lng={lng} />
      </section>
    </>
  );
}

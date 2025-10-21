"use client";

import React, { Suspense } from "react";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { importNote } from "@/actions";
interface SidebarImportProps {
  lng: string;
}

export default function SidebarImport({ lng }: SidebarImportProps) {
  const { t } = useTranslation(lng);
  const router = useRouter();
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const data = await importNote(formData);
      router.push(`{/note/${data.uid}}`);
    } catch (e: any) {
      console.error("something went wrong");
    }

    e.target.type = "text";
    e.target.type = "file";
  };
  return (
    <form method="post" encType="multipart/form-data">
      <div style={{ textAlign: "center" }}>
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          {t("import")}
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".md"
          style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
          onChange={onChange}
        />
      </div>
    </form>
  );
}

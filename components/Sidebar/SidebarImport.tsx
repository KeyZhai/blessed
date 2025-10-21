"use client";

import React, { Suspense } from "react";
import { useTranslation } from "@/app/i18n/client";
interface SidebarImportProps {
  lng: string;
}

export default function SidebarImport({ lng }: SidebarImportProps) {
  const { t } = useTranslation(lng);
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
          multiple
          style={{ position: "absolute", clip: "rect(0 0 0 0)" }}
        />
      </div>
    </form>
  );
}

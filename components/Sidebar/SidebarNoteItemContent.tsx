"use client";

import { useRef, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarNoteContentProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function SidebarNoteContent({
  id,
  title,
  children,
}: SidebarNoteContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = pathname?.split("/")[2] || null; // 修改为 /note/[id] 结构

  const [isPending] = useTransition();
  const isActive = id === selectedId;

  // Animate after title is edited.
  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);

  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      if (itemRef.current) {
        itemRef.current.classList.add("flash");
      }
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        if (itemRef.current) {
          itemRef.current.classList.remove("flash");
        }
      }}
      className="group relative"
    >
      <button
        className={`
          w-full text-left px-4 py-3 rounded-lg transition-all duration-200
          hover:bg-gray-50 active:scale-[0.98]
          ${
            isActive
              ? "bg-blue-50 border-l-4 border-blue-500"
              : "border-l-4 border-transparent"
          }
          ${isPending ? "opacity-50" : ""}
        `}
        onClick={() => {
          const sidebarToggle = document.getElementById(
            "sidebar-toggle"
          ) as HTMLInputElement | null;
          if (sidebarToggle) {
            sidebarToggle.checked = true;
          }
          router.push(`/note/${id}`);
        }}
      >
        {children}
      </button>
    </div>
  );
}

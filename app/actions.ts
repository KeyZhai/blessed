"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import type { NoteData } from "@/lib/types";

export async function saveNote(
  noteId: string | null,
  title: string,
  body: string
): Promise<never> {
  const data: NoteData = {
    title,
    content: body,
    updateTime: new Date().toISOString(),
  };

  if (noteId) {
    await updateNote(noteId, data);
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    redirect(`/note/${res}`);
  }
}

export async function deleteNote(noteId: string): Promise<never> {
  await delNote(noteId);
  redirect("/");
}

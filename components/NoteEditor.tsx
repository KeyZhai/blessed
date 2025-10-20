"use client";

import { useState, useTransition } from "react";
import NotePreview from "@/components/NotePreview";
import { deleteNote, saveNote } from "../app/actions";

interface NoteEditorProps {
  noteId: string | null;
  initialTitle: string;
  initialBody: string;
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody,
}: NoteEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <form className="note-editor-menu" role="menubar">
          <button
            className="note-editor-done"
            disabled={isPending}
            type="submit"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              startTransition(async () => {
                await saveNote(noteId, title, body);
              });
            }}
          >
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={isPending}
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                startTransition(async () => {
                  await deleteNote(noteId!);
                });
              }}
            >
              <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </form>
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}

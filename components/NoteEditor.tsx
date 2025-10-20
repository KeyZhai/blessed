"use client";

import { useState, useActionState, useEffect } from "react";
import NotePreview from "@/components/NotePreview";
import SaveButton from "@/components/SaveButton";
import DeleteButton from "@/components/DeleteButton";
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
  const [saveState, saveFormAction, isSaving] = useActionState(
    saveNote,
    undefined
  );
  const [deleteState, deleteFormAction, isDeleting] = useActionState(
    deleteNote,
    undefined
  );
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  useEffect(() => {
    if (saveState?.error) {
      console.error("Save error:", saveState.error);
    }
  }, [saveState]);

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
          <input type="hidden" name="noteId" value={noteId || ""} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="body" value={body} />
          <SaveButton saveFormAction={saveFormAction} isSaving={isSaving} />
          {!isDraft && (
            <DeleteButton
              deleteFormAction={deleteFormAction}
              isDeleting={isDeleting}
            />
          )}
        </form>
        {saveState?.error && (
          <div className="error" style={{ color: "red", marginTop: "10px" }}>
            {saveState.error}
          </div>
        )}
        {deleteState?.error && (
          <div className="error" style={{ color: "red", marginTop: "10px" }}>
            {deleteState.error}
          </div>
        )}
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}

"use client";

import SaveButton from "@/components/Note/SaveButton";
import DeleteButton from "@/components/Note/DeleteButton";
import PreviewButton from "@/components/Note/PreviewButton";
import { ActionState } from "@/actions";
import BackButton from "@/components/Note/BackButton";

interface EditorToolbarProps {
  noteId: string | null;
  title: string;
  body: string;
  isDraft: boolean;
  saveFormAction: (formData: FormData) => void;
  isSaving: boolean;
  saveState: ActionState | undefined;
  deleteFormAction: (formData: FormData) => void;
  isDeleting: boolean;
  deleteState: ActionState | undefined;
  isPreviewOpen: boolean;
  onPreviewToggle: () => void;
}

export default function EditorToolbar({
  noteId,
  title,
  body,
  isDraft,
  saveFormAction,
  isSaving,
  saveState,
  deleteFormAction,
  isDeleting,
  deleteState,
  isPreviewOpen,
  onPreviewToggle,
}: EditorToolbarProps) {
  return (
    <div className="fixed right-8 top-8 z-50">
      <div className="flex flex-col gap-2 p-2.5 bg-white/95 rounded-2xl border border-gray-200/80 shadow-2xl backdrop-blur-md">
        <BackButton />

        <div className="h-px bg-gray-200 my-0.5" />

        <form className="flex flex-col gap-2">
          <input type="hidden" name="noteId" value={noteId || ""} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="body" value={body} />

          <SaveButton
            saveFormAction={saveFormAction}
            isSaving={isSaving}
            saveState={saveState}
          />

          {!isDraft && noteId && (
            <DeleteButton
              deleteFormAction={deleteFormAction}
              isDeleting={isDeleting}
              deleteState={deleteState}
              noteId={noteId}
            />
          )}
        </form>

        <div className="h-px bg-gray-200 my-0.5" />

        <PreviewButton
          isPreviewOpen={isPreviewOpen}
          onToggle={onPreviewToggle}
        />
      </div>
    </div>
  );
}

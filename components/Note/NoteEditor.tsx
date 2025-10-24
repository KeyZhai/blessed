"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteNote, saveNote } from "@/actions";
import EditorToolbar from "@/components/Note/EditorToolbar";
import EditorPreview from "@/components/Note/EditorPreview";

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
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  // 监听保存成功，跳转到笔记页面
  useEffect(() => {
    if (saveState?.success && saveState?.noteId) {
      router.push(`/note/${saveState.noteId}`);
    }
  }, [saveState, router]);

  useEffect(() => {
    if (deleteState?.success) {
      router.push("/");
    }
  }, [deleteState, router]);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white rounded-2xl ml-4">
      {/* 编辑器区域 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <form
          className="flex-1 flex flex-col p-12 pr-28 overflow-y-auto"
          autoComplete="off"
        >
          <label className="sr-only" htmlFor="note-title-input">
            输入笔记标题
          </label>
          <input
            id="note-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="笔记标题..."
            className="mb-4 text-3xl font-bold border-none outline-none focus:ring-0 bg-transparent placeholder:text-gray-300"
          />
          <label className="sr-only" htmlFor="note-body-input">
            输入笔记内容
          </label>
          <textarea
            value={body}
            id="note-body-input"
            onChange={(e) => setBody(e.target.value)}
            placeholder="开始编写..."
            className="flex-1 resize-none border-none outline-none focus:ring-0 bg-transparent font-mono text-sm placeholder:text-gray-300"
          />
        </form>
      </div>

      {/* 右上角固定浮动操作栏 */}
      <EditorToolbar
        noteId={noteId}
        title={title}
        body={body}
        isDraft={isDraft}
        saveFormAction={saveFormAction}
        isSaving={isSaving}
        saveState={saveState}
        deleteFormAction={deleteFormAction}
        isDeleting={isDeleting}
        deleteState={deleteState}
        isPreviewOpen={isPreviewOpen}
        onPreviewToggle={() => setIsPreviewOpen(!isPreviewOpen)}
      />

      {/* 预览面板 - 从左侧滑入覆盖整个编辑区 */}
      <EditorPreview isOpen={isPreviewOpen} title={title} body={body} />
    </div>
  );
}

import NoteEditor from "@/components/Note/NoteEditor";
import { getNote } from "@/lib/strapi";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: noteId } = await params;
  const note = await getNote(noteId);

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return (
    <NoteEditor
      noteId={noteId}
      initialTitle={note.title}
      initialBody={note.content}
    />
  );
}

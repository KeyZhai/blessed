import NoteEditor from "@/components/Note/NoteEditor";

export default async function EditPage() {
  return <NoteEditor noteId={null} initialTitle="Untitled" initialBody="" />;
}

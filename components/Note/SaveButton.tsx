interface SaveButtonProps {
  saveFormAction: (formData: FormData) => void;
  isSaving: boolean;
}

export default function SaveButton({
  saveFormAction,
  isSaving,
}: SaveButtonProps) {
  return (
    <button
      className="note-editor-done"
      disabled={isSaving}
      type="submit"
      role="menuitem"
      formAction={saveFormAction}
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {isSaving ? "Saving..." : "Done"}
    </button>
  );
}

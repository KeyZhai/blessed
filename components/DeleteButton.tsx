interface DeleteButtonProps {
  deleteFormAction: (formData: FormData) => void;
  isDeleting: boolean;
}

export default function DeleteButton({
  deleteFormAction,
  isDeleting,
}: DeleteButtonProps) {
  return (
    <button
      className="note-editor-delete"
      disabled={isDeleting}
      role="menuitem"
      formAction={deleteFormAction}
    >
      <img
        src="/cross.svg"
        width="10px"
        height="10px"
        alt=""
        role="presentation"
      />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}

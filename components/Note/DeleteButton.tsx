"use client";

import { ActionState } from "@/actions";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconTrash } from "@tabler/icons-react";

interface DeleteButtonProps {
  deleteFormAction: (formData: FormData) => void;
  isDeleting: boolean;
  deleteState: ActionState | undefined;
  noteId: string;
}

export default function DeleteButton({
  deleteFormAction,
  isDeleting,
  deleteState,
  noteId,
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (deleteState?.error) {
      toast.error(deleteState.error);
      setOpen(false);
    } else if (deleteState?.success) {
      toast.success("删除成功");
      setOpen(false);
    }
  }, [deleteState]);

  const handleDelete = () => {
    // 创建 FormData 并添加 noteId
    const formData = new FormData();
    formData.append("noteId", noteId);
    deleteFormAction(formData);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isDeleting}
          type="button"
          role="menuitem"
          className="h-10 w-10 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
          title="删除笔记"
        >
          <IconTrash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>删除笔记</AlertDialogTitle>
          <AlertDialogDescription>
            确定要删除这条笔记吗？此操作无法撤销。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            <IconTrash className="w-4 h-4" /> 删除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

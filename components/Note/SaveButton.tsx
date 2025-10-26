"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ActionState } from "@/actions";
import { IconCheck } from "@tabler/icons-react";

interface SaveButtonProps {
  saveFormAction: (formData: FormData) => void;
  isSaving: boolean;
  saveState: ActionState | undefined;
}

export default function SaveButton({
  saveFormAction,
  isSaving,
  saveState,
}: SaveButtonProps) {
  // 监听 saveState 变化，显示提示
  useEffect(() => {
    if (!saveState) return;

    if (saveState.error) {
      toast.error(saveState.error);
    } else if (saveState.success) {
      toast.success("保存成功");
    }
  }, [saveState]);

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isSaving}
      type="submit"
      role="menuitem"
      formAction={saveFormAction}
      className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 transition-colors disabled:opacity-50"
      title={isSaving ? "保存中..." : "保存"}
    >
      <IconCheck className="w-4 h-4" />
    </Button>
  );
}

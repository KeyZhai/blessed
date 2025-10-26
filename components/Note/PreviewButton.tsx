"use client";

import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PreviewButtonProps {
  isPreviewOpen: boolean;
  onToggle: () => void;
}

export default function PreviewButton({
  isPreviewOpen,
  onToggle,
}: PreviewButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onToggle}
      role="menuitem"
      className="h-10 w-10 hover:bg-purple-50 hover:text-purple-600 transition-colors"
      title={isPreviewOpen ? "隐藏预览" : "显示预览"}
    >
      {isPreviewOpen ? (
        <EyeOffIcon className="w-4 h-4" />
      ) : (
        <EyeIcon className="w-4 h-4" />
      )}
    </Button>
  );
}

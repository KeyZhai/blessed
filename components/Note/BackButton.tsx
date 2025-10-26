import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BackButton() {
  const handleBackBtn = () => {
    window.history.back();
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      role="menuitem"
      className="h-10 w-10 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      title="返回"
      onClick={() => handleBackBtn()}
    >
      <IconArrowLeft className="w-4 h-4" />
    </Button>
  );
}

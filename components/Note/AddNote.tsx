"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IconPlus, IconFileText, IconUpload } from "@tabler/icons-react";
import { importNote } from "@/actions";
import { toast } from "sonner";

export default function AddNote() {
  const router = useRouter();

  const handleFileImport = () => {
    // 创建一个隐藏的文件输入元素
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const data = await importNote(formData);

        if (data.error) {
          toast.error(data.error);
        } else if (data.uid) {
          toast.success("导入成功");
          router.push(`/note/${data.uid}`);
        }
      } catch (error) {
        console.error("导入失败:", error);
        toast.error("导入失败");
      }

      // 重置 input
      if (e.target) {
        const target = e.target as HTMLInputElement;
        target.type = "text";
        target.type = "file";
      }
    };
    input.click();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors flex items-center justify-center border-none bg-transparent cursor-pointer"
          title="新建笔记"
        >
          <IconPlus className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-48 p-2 bg-white border-gray-200 shadow-lg z-[9999]"
        side="right"
        align="start"
        sideOffset={8}
      >
        <div className="flex flex-col gap-1">
          <Link href="/note/edit">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-10 px-3 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <IconFileText className="w-4 h-4" />
              <span>新增笔记</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-10 px-3 hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={handleFileImport}
          >
            <IconUpload className="w-4 h-4" />
            <span>导入笔记</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

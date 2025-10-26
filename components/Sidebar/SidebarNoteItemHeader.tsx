import dayjs from "dayjs";

interface SidebarNoteItemHeaderProps {
  title: string;
  updateTime: Date;
  content?: string;
}

export default function SidebarNoteItemHeader({
  title,
  updateTime,
  content,
}: SidebarNoteItemHeaderProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-1 flex-1">
          {title}
        </h3>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-gray-500 line-clamp-1 flex-1">
          {content ? content.substring(0, 30) : <i>(No content)</i>}
        </p>
      </div>
      <time className="text-xs text-gray-400">
        {dayjs(updateTime).format("MM-DD HH:mm")}
      </time>
    </div>
  );
}

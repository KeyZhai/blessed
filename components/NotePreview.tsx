import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

interface NotePreviewProps {
  children: string;
}

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
]);

const allowedAttributes = Object.assign(
  {},
  sanitizeHtml.defaults.allowedAttributes,
  {
    img: ["alt", "src"],
  }
);

export default async function NotePreview({ children }: NotePreviewProps) {
  // 使用 await 处理异步的 marked
  const html = await marked(children || "");
  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
  });

  return (
    <div className="note-preview">
      <div
        className="text-with-markdown"
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
      />
    </div>
  );
}

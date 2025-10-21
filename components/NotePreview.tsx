"use client";

import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { useEffect, useState } from "react";

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

export default function NotePreview({ children }: NotePreviewProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    // 在客户端异步处理 marked
    const processMarkdown = async () => {
      const processedHtml = await marked(children || "");
      setHtml(processedHtml);
    };
    processMarkdown();
  }, [children]);

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

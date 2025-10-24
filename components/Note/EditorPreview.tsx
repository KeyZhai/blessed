"use client";

import { motion, AnimatePresence } from "motion/react";
import NotePreview from "@/components/Note/NotePreview";

interface EditorPreviewProps {
  isOpen: boolean;
  title: string;
  body: string;
}

export default function EditorPreview({
  isOpen,
  title,
  body,
}: EditorPreviewProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 300,
          }}
          className="absolute inset-0 bg-white z-40 overflow-y-auto shadow-2xl rounded-2xl"
        >
          <div className="p-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 bg-blue-500 rounded-full" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                预览
              </span>
            </div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold mb-8 text-gray-900"
            >
              {title || "无标题"}
            </motion.h1>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <NotePreview>{body}</NotePreview>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

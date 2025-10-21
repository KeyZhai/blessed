"use server";

import { redirect } from "next/navigation";
import { addNote, updateNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { stat, mkdir, writeFile } from "fs/promises";
import { join } from "path";
import mime from "mime";
import dayjs from "dayjs";
import type { NoteData } from "@/lib/types";

// 定义返回状态类型
export type ActionState = {
  error?: string;
};

const schema = z.object({
  title: z.string().trim().min(1, "请填写标题"),
  content: z.string().min(1, "请填写内容").max(100, "字数最多 100"),
});

export async function saveNote(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  let noteId = formData.get("noteId") as string | null;
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  const data: NoteData = {
    title,
    content: body,
    updateTime: new Date(),
  };

  // 验证数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    // 将第一个错误信息转换为字符串
    return {
      error: validated.error.issues[0]?.message || "验证失败",
    };
  }

  try {
    if (noteId) {
      await updateNote(noteId, data);
    } else {
      const res = await addNote(data);
      noteId = res;
    }
  } catch (error) {
    return { error: "Failed to save note" };
  }

  // 清除缓存，确保侧边栏和页面显示最新数据
  revalidatePath("/", "layout"); // 更新侧边栏缓存
  // redirect 会抛出错误,中断执行
  redirect(`/note/${noteId}`);
}

export async function deleteNote(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const noteId = formData.get("noteId") as string;

  try {
    await delNote(noteId);
  } catch (error) {
    return { error: "Failed to delete note" };
  }

  // 清除缓存，确保侧边栏和页面显示最新数据
  revalidatePath("/", "layout");
  // redirect 会抛出错误,中断执行
  redirect("/");
}

export async function importNote(formData: FormData) {
  const file = formData.get("file") as File | null;

  // 空值判断
  if (!file || typeof file === "string") {
    return { error: "File is required." };
  }

  // 写入文件
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(e);
      return { error: "Something went wrong." };
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(
      file.type
    )}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口,写入数据库
    const res = await addNote({
      title: filename,
      content: buffer.toString("utf-8"),
      updateTime: new Date(),
    });

    // 清除缓存
    revalidatePath("/", "layout");

    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong." };
  }
}

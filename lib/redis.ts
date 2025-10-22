import Redis from "ioredis";
import type { NoteData, Notes } from "@/lib/types";

const redis = new Redis();

const initialData: Notes = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes(): Promise<Notes> {
  const data = await redis.hgetall("notes");
  if (Object.keys(data).length === 0) {
    await redis.hset("notes", initialData);
  }
  return await redis.hgetall("notes");
}

export async function addNote(data: NoteData): Promise<string> {
  const uuid = Date.now().toString();
  const noteData = JSON.stringify(data);
  await redis.hset("notes", uuid, noteData);
  return uuid;
}

export async function updateNote(uuid: string, data: NoteData): Promise<void> {
  const noteData = JSON.stringify(data);
  await redis.hset("notes", uuid, noteData);
}

export async function getNote(uuid: string): Promise<NoteData | null> {
  const note = await redis.hget("notes", uuid);
  if (!note) return null;
  return JSON.parse(note) as NoteData;
}

export async function delNote(uuid: string): Promise<number> {
  return redis.hdel("notes", uuid);
}

export async function getUser(
  username: string,
  password: string
): Promise<{ name: string; username: string } | 0 | 1> {
  const storedPassword = await redis.hget("users", username);

  // 用户不存在
  if (!storedPassword) return 0;

  // 密码错误
  if (storedPassword !== password) return 1;

  // 验证成功
  return {
    name: username,
    username,
  };
}

export async function addUser(
  username: string,
  password: string
): Promise<{ name: string; username: string }> {
  await redis.hset("users", username, password);

  return {
    name: username,
    username,
  };
}
export default redis;

import type {
  Notes,
  StrapiNotesResponse,
  StrapiNote,
  NoteData,
} from "@/lib/types";

// Strapi API 配置
const STRAPI_BASE_URL = "http://localhost:1337";
const STRAPI_API_TOKEN =
  "bearer 61e70428512d0a7385cc0d6e91b296e4e18f58d0bd78fd34f967a68995ec5420444d614f5974194cff993024a3daecf653e3ad506d65dad365c618409ac0fba373c3846a57ef514e94c98eb284abcb369b9844dbd948352463da9850bd81fee441c62fa4cf9d4ad5f0a2b583b24180a75769b10b5473865ec047c8d03ed9770c";

export async function getAllNotes(): Promise<Notes> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/notes`);
  const data: StrapiNotesResponse = await response.json();

  const res: Notes = {};

  data.data.forEach(({ id, title, content, slug, updatedAt }) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });

  return res;
}

export async function addNote(data: NoteData): Promise<string> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/notes`, {
    method: "POST",
    headers: {
      Authorization: STRAPI_API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });
  const res = await response.json();
  return res.data.slug;
}

export async function updateNote(uuid: string, data: NoteData): Promise<void> {
  const { id } = await getNote(uuid);
  const response = await fetch(`${STRAPI_BASE_URL}/api/notes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: STRAPI_API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid: string): Promise<StrapiNote> {
  const response = await fetch(
    `${STRAPI_BASE_URL}/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data: StrapiNotesResponse = await response.json();
  return {
    title: data.data[0].title,
    content: data.data[0].content,
    updateTime: data.data[0].updatedAt,
    id: data.data[0].id,
  };
}

export async function delNote(uuid: string): Promise<void> {
  const { id } = await getNote(uuid);
  const response = await fetch(`${STRAPI_BASE_URL}/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: STRAPI_API_TOKEN,
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  const res = await response.json();
}

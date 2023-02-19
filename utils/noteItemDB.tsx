import { PrismaClient } from "@prisma/client";

export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  published?: boolean;
  id: number;
};

export async function isExistAtId(
  id: string,
  prisma: PrismaClient
): Promise<boolean> {
  const item = await prisma.noteItem.findFirst({ where: { id: id } });
  return item != null;
}

export function saveItemDB(item: NoteItem) {
  fetch("/api/noteItem/" + item.id + "/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: item.title,
      explanation: item.explanation,
      url: item.url,
    }),
  })
    .then((v) => {
      return v;
    })
    .catch(() => {
      console.log(Function.name + "error");
    });
}

export function addItemDB(id: number) {
  fetch("/api/noteItem/" + id + "/add")
    .then()
    .catch(() => {
      console.log(Function.name + "error");
    });
}

export function changePublishedDB(item: NoteItem) {
  fetch("/api/noteItem/" + item.id + "/update_published", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      published: item.published,
    }),
  })
    .then((v) => {
      return v;
    })
    .catch(() => {
      console.log(Function.name + "error");
    });
}

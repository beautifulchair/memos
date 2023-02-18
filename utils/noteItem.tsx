import { PrismaClient } from "@prisma/client";

export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  id: number;
};

export function equalItem(
  item1: NoteItem | undefined,
  item2: NoteItem | undefined
): boolean {
  const isTitle: boolean = item1?.title == item2?.title;
  const isExplanation: boolean = item1?.explanation == item2?.explanation;
  const isUrl: boolean = item1?.url == item2?.url;
  return isTitle && isExplanation && isUrl;
}

export function changedTitle(
  item: NoteItem,
  title: string | undefined
): NoteItem {
  const newItem = item;
  newItem.title = title;
  return newItem;
}

export function changedExplanation(
  item: NoteItem,
  explanation: string | undefined
): NoteItem {
  const newTitle = item;
  newTitle.explanation = explanation;
  return newTitle;
}

export function changedUrl(item: NoteItem, url: string | undefined): NoteItem {
  const newTitle = item;
  newTitle.url = url;
  return newTitle;
}

export function changedNoteItems(
  noteItems: NoteItem[],
  newItem: NoteItem
): NoteItem[] {
  const newNoteItems = noteItems.map((itm) =>
    itm.id == newItem.id ? newItem : itm
  );
  return newNoteItems;
}

export async function isExitAtId(
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

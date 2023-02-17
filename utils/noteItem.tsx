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

export function changedItem(
  item: NoteItem,
  title?: string,
  explanation?: string,
  url?: string
): NoteItem {
  const newTitle = title !== undefined ? title : item.title;
  const newExplanation =
    explanation !== undefined ? explanation : item.explanation;
  const newUrl = url !== undefined ? url : item.url;
  const newItem: NoteItem = {
    id: item.id,
    title: newTitle,
    explanation: newExplanation,
    url: newUrl,
  };
  return newItem;
}

export function changedNoteItems(
  noteItems: NoteItem[],
  id: number,
  title?: string,
  explanation?: string,
  url?: string
): NoteItem[] {
  const newNoteItems = noteItems.map((item) =>
    item.id === id ? changedItem(item, title, explanation, url) : item
  );
  return newNoteItems;
}

export async function isExitAtId(
  id: string,
  prisma: PrismaClient
): Promise<boolean> {
  const item = await prisma.noteItem.findFirst({ where: { id: id } });
  return item !== null;
}

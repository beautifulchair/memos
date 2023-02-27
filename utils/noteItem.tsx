export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  published?: boolean;
  id: number;
};

const editableprops = ["title", "explanation", "url"] as const;
type NoteEdit = Pick<NoteItem, typeof editableprops[number]>;

export function equalItemAtEditable(item1: NoteItem, item2: NoteItem): boolean {
  type Key = keyof NoteEdit;
  for (const prop of editableprops) {
    if (item1[prop as Key] != item2[prop as Key]) return false;
  }
  return true;
}

export function editItem(item: NoteItem, change: Partial<NoteEdit>): NoteItem {
  type key = keyof NoteEdit;
  for (const prop in change) {
    item[prop as key] = change[prop as key];
  }
  return item;
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

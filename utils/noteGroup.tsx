export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  published?: boolean;
  id: number;
};

export function changedNoteItems(
  noteItems: NoteItem[],
  newItem: NoteItem
): NoteItem[] {
  const newNoteItems = noteItems.map((itm) =>
    itm.id == newItem.id ? newItem : itm
  );
  return newNoteItems;
}

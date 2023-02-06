export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  id: number;
};

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
  console.log(newNoteItems);
  return newNoteItems;
}

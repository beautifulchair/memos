export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  published?: boolean;
  id: number;
};

const editableprops = ["title", "explanation", "url"] as const;
type EditableProps = Pick<NoteItem, typeof editableprops[number]>;

export function equalItemAtEditable(item1: NoteItem, item2: NoteItem): boolean {
  type Key = keyof EditableProps;
  for (const prop of editableprops) {
    if (item1[prop as Key] != item2[prop as Key]) return false;
  }
  return true;
}

export function editItem(item: NoteItem, change: EditableProps): NoteItem {
  type key = keyof EditableProps;
  for (const prop in change) {
    item[prop as key] = change[prop as key];
  }
  return item;
}

export function changedPublished(item: NoteItem, published: boolean): NoteItem {
  const newTitle = item;
  newTitle.published = published;
  return newTitle;
}

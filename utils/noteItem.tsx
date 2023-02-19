export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  published?: boolean;
  id: number;
};

type EditableProps = Pick<NoteItem, "title" | "explanation" | "url">;

export function equalItem(
  item1: NoteItem | undefined,
  item2: NoteItem | undefined
): boolean {
  const isTitle: boolean = item1?.title == item2?.title;
  const isExplanation: boolean = item1?.explanation == item2?.explanation;
  const isUrl: boolean = item1?.url == item2?.url;
  return isTitle && isExplanation && isUrl;
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

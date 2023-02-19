export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  published?: boolean;
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

export function changedPublished(item: NoteItem, published: boolean): NoteItem {
  const newTitle = item;
  newTitle.published = published;
  return newTitle;
}

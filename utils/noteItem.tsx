export type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  id: number;
};

export function changeTitleAtId(
  noteItems: NoteItem[],
  title: string,
  id: number
) {
  let itemAtId = noteItems.find((item) => item.id === id);
  if (itemAtId) itemAtId.title = title;
}

export function changeExplanationAtId(
  noteItems: NoteItem[],
  explanation: string,
  id: number
) {
  let itemAtId = noteItems.find((item) => item.id === id);
  if (itemAtId) itemAtId.explanation = explanation;
}

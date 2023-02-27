import { NoteItem } from "@/utils/noteItem";

const editableprops = ["title", "explanation", "url"] as const;
type EditableProps = Pick<NoteItem, typeof editableprops[number]>;

export async function isExistAtId(id: string, prisma: any): Promise<boolean> {
  const item = await prisma.noteItemData.findFirst({ where: { id: id } });
  return item != null;
}

export function saveEditDB(id: number, change: Partial<EditableProps>) {
  fetch("/api/noteItem/" + id + "/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(change),
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

export function changePublishedDB(id: number, published: boolean) {
  fetch("/api/noteItem/" + id + "/update_published", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      published: published,
    }),
  })
    .then((v) => {
      return v;
    })
    .catch(() => {
      console.log(Function.name + "error");
    });
}

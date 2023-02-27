import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import { equalItemAtEditable, editItem } from "@/utils/noteItem";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import NewTabLink from "@/components/NewTabLink";
import {
  NoteItem,
  changedNoteItems,
  addItemDB,
  changePublishedDB,
  saveEditDB,
} from "@/utils/noteItem";

const initializedItem = (id: number): NoteItem => ({
  title: "-",
  explanation: "~",
  url: "",
  id: id,
  published: true,
});

type PageProps = {
  dbNoteItems: NoteItem[];
};

export default function Home({ dbNoteItems }: PageProps) {
  // initial noteItems
  const [noteItems, setNoteItems] = useState<NoteItem[]>(dbNoteItems);

  async function addNote() {
    const lastItem: NoteItem | undefined = noteItems.at(-1);
    if (
      lastItem == undefined ||
      !equalItemAtEditable(lastItem, initializedItem(-1))
    ) {
      const id = noteItems.length;
      setNoteItems([...noteItems, initializedItem(id)]);
      addItemDB(id);
    }
  }

  function keyDownOnTitle(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key == "Enter" && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnTitle(e: React.FocusEvent<HTMLTextAreaElement>, id: number) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const oldItem = noteItems.filter((itm) => itm.id == id)[0];
    const newItem = editItem(oldItem, { title: target.value });
    setNoteItems(changedNoteItems(noteItems, newItem));
    saveEditDB(id, { title: target.value });
  }
  function keyDownOnURL(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key == "Enter" && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnUrl(e: React.FocusEvent<HTMLTextAreaElement>, id: number) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const oldItem = noteItems.filter((itm) => itm.id == id)[0];
    const newItem = editItem(oldItem, { url: target.value });
    setNoteItems(changedNoteItems(noteItems, newItem));
    saveEditDB(id, { url: target.value });
  }
  function keyDownOnExplanation(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const target: HTMLTextAreaElement = e.currentTarget;

    if (e.key == "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key == "Enter" && e.shiftKey && !e.nativeEvent.isComposing) {
      target.rows += 1;
    }
  }
  function blurOnExplanation(
    e: React.FocusEvent<HTMLTextAreaElement>,
    id: number
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const oldItem = noteItems.filter((itm) => itm.id == id)[0];
    const newItem = editItem(oldItem, { explanation: target.value });
    setNoteItems(changedNoteItems(noteItems, newItem));
    saveEditDB(id, { explanation: target.value });
  }
  function keyDownCaputureOnExplanation(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const lastChar = target.value.at(-1);
    if (e.key == "Backspace" && lastChar?.charCodeAt(0) == 10) {
      target.rows -= 1;
    }
  }

  function hiddenItem(id: number) {
    setNoteItems(noteItems.filter((itm) => itm.id != id));
    changePublishedDB(id, false);
  }

  const NoteItem = ({ item }: { item: NoteItem }) => (
    <div className="">
      <div className="flex">
        <textarea
          className="underline font-bold italic p-0.5"
          rows={1}
          defaultValue={item.title}
          onKeyDown={(e) => keyDownOnTitle(e)}
          onBlur={(e) => blurOnTitle(e, item.id)}
          autoCorrect="off"
          spellCheck="false"
        />
        {item.url && (
          <NewTabLink href={item.url} className="text-gray-400 ml-3">
            url:
          </NewTabLink>
        )}
        <textarea
          className="text-sky-600 font-light ml-2 w-full p-0.5"
          rows={1}
          defaultValue={item.url}
          onKeyDown={(e) => keyDownOnURL(e)}
          onBlur={(e) => blurOnUrl(e, item.id)}
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      <textarea
        className="font-light block w-full p-0.5"
        rows={1}
        defaultValue={item.explanation}
        onKeyDown={(e) => keyDownOnExplanation(e)}
        onKeyDownCapture={(e) => keyDownCaputureOnExplanation(e)}
        onBlur={(e) => blurOnExplanation(e, item.id)}
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );

  const NoteTable = ({ nis }: { nis: NoteItem[] }) => (
    <ol className="list-decimal mt-10">
      {nis
        .filter((itm) => itm.published == true)
        .sort((i1, i2) => i1.id - i2.id)
        .map((item) => (
          <li key={item.id} className="mt-7 border-b-2 border-dashed pb-3">
            <div className="flex">
              <button
                className="rounded-full w-4 h-4 bg-red-600 border"
                onClick={() => hiddenItem(item.id)}
              />
              <NoteItem item={item} />
            </div>
          </li>
        ))}
    </ol>
  );

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainLayout>
        <NoteTable nis={noteItems} />
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={(e) => addNote()}
            className="h-10 w-10 bg-sky-400 rounded-full ml-4"
          ></button>
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const dbNoteItems = await prisma.noteItemData.findMany();
  return { props: { dbNoteItems } };
};

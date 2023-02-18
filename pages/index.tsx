import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import Link from "next/link";
import {
  NoteItem,
  changedNoteItems,
  equalItem,
  changedTitle,
  changedUrl,
  changedExplanation,
  saveItem,
} from "@/utils/noteItem";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";

const initializedItem = (id: number): NoteItem => ({
  title: "-",
  explanation: "~",
  url: "",
  id: id,
});

type PageProps = {
  dbNoteItems: NoteItem[];
};

export default function Home({ dbNoteItems }: PageProps) {
  // initial noteItems
  const [noteItems, setNoteItems] = useState<NoteItem[]>(dbNoteItems);

  async function addNote() {
    const lastItem: NoteItem | undefined = noteItems.at(-1);
    if (equalItem(lastItem, initializedItem(-1))) {
      const id = noteItems.length;
      setNoteItems([...noteItems, initializedItem(id)]);
      const response = await fetch("/api/noteItem/" + id + "/add");
    }
  }

  function keyDownOnTitle(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key == "Enter" && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnTitle(
    e: React.FocusEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const newItem = changedTitle(item, target.value);
    setNoteItems(changedNoteItems(noteItems, newItem));
    saveItem(newItem);
  }
  function keyDownOnURL(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key == "Enter" && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnUrl(e: React.FocusEvent<HTMLTextAreaElement>, item: NoteItem) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const newItem = changedUrl(item, target.value);
    setNoteItems(changedNoteItems(noteItems, newItem));
    saveItem(newItem);
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
    item: NoteItem
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const newItem = changedExplanation(item, target.value);
    setNoteItems(changedNoteItems(noteItems, newItem));
    saveItem(newItem);
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

  function saveNotes() {
    noteItems.map(async (item) => {
      const response = await fetch("/api/noteItem/" + item.id + "/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: item.title,
          explanation: item.explanation,
          url: item.url,
        }),
      });
    });
  }

  const NoteItem = ({ item }: { item: NoteItem }) => (
    <div className="">
      <div className="flex">
        <textarea
          className="underline font-bold italic p-0.5"
          rows={1}
          defaultValue={item.title}
          onKeyDown={(e) => keyDownOnTitle(e)}
          onBlur={(e) => blurOnTitle(e, item)}
          autoCorrect="off"
          spellCheck="false"
        />
        {item.url && (
          <Link href={item.url} className="text-gray-400 ml-3">
            url:
          </Link>
        )}
        <textarea
          className="text-sky-600 font-light ml-2 w-full p-0.5"
          rows={1}
          defaultValue={item.url}
          onKeyDown={(e) => keyDownOnURL(e)}
          onBlur={(e) => blurOnUrl(e, item)}
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
        onBlur={(e) => blurOnExplanation(e, item)}
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );

  const NoteTable = ({ nis }: { nis: NoteItem[] }) => (
    <ol className="list-decimal mt-10">
      {nis
        .sort((i1, i2) => i1.id - i2.id)
        .map((item) => (
          <li key={item.id} className="mt-7 border-b-2 border-dashed pb-3">
            <NoteItem item={item} />
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
          <button
            onClick={(e) => saveNotes()}
            className="h-10 w-10 bg-lime-500 rounded-full ml-4"
          ></button>
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const dbNoteItems = await prisma.noteItem.findMany();
  return { props: { dbNoteItems } };
};

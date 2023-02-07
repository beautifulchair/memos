import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import Link from "next/link";
import { NoteItem, changedNoteItems } from "@/utils/noteItem";
import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";

type PageProps = {
  dbNoteItems: NoteItem[];
};

export default function Home({ dbNoteItems }: PageProps) {
  // initial noteItems
  const [noteItems, setNoteItems] = useState<NoteItem[]>(dbNoteItems);

  function addNote() {
    const lastItem: NoteItem | undefined = noteItems.at(-1);
    if (
      lastItem?.title !== "-" ||
      lastItem?.explanation !== "~" ||
      lastItem?.url !== ""
    ) {
      const newNoteItem: NoteItem = {
        title: "-",
        explanation: "~",
        url: "",
        id: noteItems.length,
      };
      setNoteItems([...noteItems, newNoteItem]);
    }
  }

  function keyDownOnTitle(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnTitle(
    e: React.FocusEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    setNoteItems(
      changedNoteItems(
        noteItems,
        item.id,
        e.currentTarget.value,
        undefined,
        undefined
      )
    );
  }
  function keyDownOnURL(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnUrl(e: React.FocusEvent<HTMLTextAreaElement>, item: NoteItem) {
    setNoteItems(
      changedNoteItems(
        noteItems,
        item.id,
        undefined,
        undefined,
        e.currentTarget.value
      )
    );
  }
  function keyDownOnExplanation(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;

    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key === "Enter" && e.shiftKey && !e.nativeEvent.isComposing) {
      target.rows += 1;
    }
  }
  function blurOnExplanation(
    e: React.FocusEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    setNoteItems(
      changedNoteItems(
        noteItems,
        item.id,
        undefined,
        e.currentTarget.value,
        undefined
      )
    );
  }
  function keyDownCaputureOnExplanation(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;
    const lastChar = target.value.at(-1);
    if (e.key === "Backspace" && lastChar?.charCodeAt(0) === 10) {
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

  const NoteTable = () => (
    <ol className="list-decimal mt-10">
      {noteItems.map((item) => (
        <li key={item.id} className="mt-7 border-b-2 border-dashed pb-3">
          <div className="">
            <div className="flex">
              <textarea
                className="underline font-bold italic p-0.5"
                rows={1}
                defaultValue={item.title}
                onKeyDown={(e) => keyDownOnTitle(e, item)}
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
                onKeyDown={(e) => keyDownOnURL(e, item)}
                onBlur={(e) => blurOnUrl(e, item)}
                autoCorrect="off"
                spellCheck="false"
              />
            </div>
            <textarea
              className="font-light block w-full p-0.5"
              rows={1}
              defaultValue={item.explanation}
              onKeyDown={(e) => keyDownOnExplanation(e, item)}
              onKeyDownCapture={(e) => keyDownCaputureOnExplanation(e)}
              onBlur={(e) => blurOnExplanation(e, item)}
              autoCorrect="off"
              spellCheck="false"
            />
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
        <NoteTable />
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

export const getStaticProps: GetStaticProps = async () => {
  const dbNoteItems = await prisma.noteItem.findMany();
  return { props: { dbNoteItems } };
};

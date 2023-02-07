import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import Link from "next/link";
import { NoteItem, changedNoteItems } from "@/utils/noteItem";

export default function Home() {
  // initial noteItems
  const [noteItems, setNoteItems] = useState<NoteItem[]>([
    {
      title: "initial title",
      explanation: "initial explanation",
      url: "/",
      id: 0,
    },
  ]);

  function addNote() {
    const newNoteItem: NoteItem = {
      title: "-",
      explanation: "~",
      url: "",
      id: noteItems.length,
    };
    setNoteItems([...noteItems, newNoteItem]);
    console.log(noteItems);
  }

  function keyDownOnTitle(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    if (e.key === "Enter") {
      // invalidiate new line
      e.preventDefault();

      const id: number = item.id;
      const target = e.currentTarget;
      setNoteItems(
        changedNoteItems(noteItems, id, target.value, undefined, undefined)
      );
      target.blur();
    }
  }
  function keyDownOnURL(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    if (e.key === "Enter") {
      // invalidiate new line
      e.preventDefault();

      const id: number = item.id;
      const target = e.currentTarget;
      setNoteItems(
        changedNoteItems(noteItems, id, undefined, undefined, target.value)
      );
      target.blur();
    }
  }

  function keyDownOnExplanation(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;

    if (e.key === "Enter" && !e.shiftKey) {
      // invalidiate new line
      e.preventDefault();

      const id: number = item.id;
      setNoteItems(
        changedNoteItems(noteItems, id, undefined, target.value, undefined)
      );
      target.blur();
    } else if (e.key === "Enter" && e.shiftKey) {
      const lineN = target.rows;
      target.rows += 1;
    }
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
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => addNote()}
            className="h-10 w-10 bg-sky-400 rounded-full ml-4"
          ></button>
        </div>
        <NoteTable />
      </MainLayout>
    </>
  );
}

import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import Link from "next/link";
import { NoteItem, changedNoteItems, changedItem } from "@/utils/noteItem";

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
      e.currentTarget.blur();
    }
  }
  function blurOnTitle(
    e: React.FocusEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    const id = item.id;
    const newTitle = e.currentTarget.value;
    const newNoteItems: NoteItem[] = noteItems.map((itm) =>
      itm.id === id ? changedItem(itm, newTitle, undefined, undefined) : itm
    );
    setNoteItems(newNoteItems);
  }
  function keyDownOnURL(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    if (e.key === "Enter") {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    }
  }
  function blurOnUrl(e: React.FocusEvent<HTMLTextAreaElement>, item: NoteItem) {
    const id = item.id;
    const newUrl = e.currentTarget.value;
    const newNoteItems: NoteItem[] = noteItems.map((itm) =>
      itm.id === id ? changedItem(itm, undefined, undefined, newUrl) : itm
    );
    setNoteItems(newNoteItems);
  }
  function keyDownOnExplanation(
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    const target: HTMLTextAreaElement = e.currentTarget;

    if (e.key === "Enter" && !e.shiftKey) {
      // invalidiate new line
      e.preventDefault();
      e.currentTarget.blur();
    } else if (e.key === "Enter" && e.shiftKey) {
      target.rows += 1;
    }
  }
  function blurOnExplanation(
    e: React.FocusEvent<HTMLTextAreaElement>,
    item: NoteItem
  ) {
    const id = item.id;
    const newExplanation = e.currentTarget.value;
    const newNoteItems: NoteItem[] = noteItems.map((itm) =>
      itm.id === id
        ? changedItem(itm, undefined, newExplanation, undefined)
        : itm
    );
    setNoteItems(newNoteItems);
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
        </div>
      </MainLayout>
    </>
  );
}

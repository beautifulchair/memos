import Head from "next/head";
import { Inter } from "@next/font/google";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
  id: number;
};

function changeTitleAtId(noteItems: NoteItem[], title: string, id: number) {
  let itemAtId = noteItems.find((item) => item.id === id);
  if (itemAtId) itemAtId.title = title;
}

function changeExplanationAtId(
  noteItems: NoteItem[],
  explanation: string,
  id: number
) {
  let itemAtId = noteItems.find((item) => item.id === id);
  if (itemAtId) itemAtId.explanation = explanation;
}

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
      changeTitleAtId(noteItems, target.value, id);
      setNoteItems(noteItems);
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
      changeExplanationAtId(noteItems, target.value, id);
      setNoteItems(noteItems);
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
            <div className="flex justify-between">
              <textarea
                className="underline font-bold italic"
                rows={1}
                defaultValue={item.title}
                onKeyDown={(e) => keyDownOnTitle(e, item)}
              />
              {item.url && (
                <Link href={item.url} className="text-sky-600 font-light">
                  {item.url}
                </Link>
              )}
            </div>
            <textarea
              className="font-light block w-full"
              rows={1}
              defaultValue={item.explanation}
              onKeyDown={(e) => keyDownOnExplanation(e, item)}
              onKeyDownCapture={(e) => keyDownCaputureOnExplanation(e)}
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
          <p>Hello</p>
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

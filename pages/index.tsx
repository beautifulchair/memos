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

  const NoteTable = () => (
    <ol className="list-decimal mt-10">
      {noteItems.map((item) => (
        <li key={item.id} className="mt-7 border-b-2 border-dashed pb-3">
          <div className="">
            <div className="flex justify-between">
              <p className="underline font-bold italic">{item.title}</p>
              {item.url && (
                <Link href={item.url} className="text-sky-600 font-light">
                  {item.url}
                </Link>
              )}
            </div>
            <p className="font-light">{item.explanation}</p>
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

import Head from "next/head";
import { Inter } from "@next/font/google";
import MainLayout from "@/components/MainLayout";
import { convertCompilerOptionsFromJson } from "typescript";
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
      url: "",
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
    noteItems.push(newNoteItem);
    setNoteItems(noteItems);
    console.log(noteItems);
  }

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
        {noteItems.map((item) => (
          <li key={item.id}>
            <div className="list-decimal border-2">
              <div className="flex">
                <p>{item.title}</p>
                {item.url && <link>{item.url}</link>}
              </div>
              <p>{item.explanation}</p>
            </div>
          </li>
        ))}
      </MainLayout>
    </>
  );
}

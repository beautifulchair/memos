import Head from "next/head";
import { Inter } from "@next/font/google";
import MainLayout from "@/components/MainLayout";
import { convertCompilerOptionsFromJson } from "typescript";

const inter = Inter({ subsets: ["latin"] });

type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
};

function addNote(noteItems: NoteItem[]) {
  const newNoteItem: NoteItem = { title: "-", explanation: "~", url: "" };
  noteItems.push(newNoteItem);
  console.log(noteItems);
}

export default function Home() {
  const noteItems: NoteItem[] = [];
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
            onClick={(e) => addNote(noteItems)}
            className="h-10 w-10 bg-sky-400 rounded-full ml-4"
          ></button>
        </div>
      </MainLayout>
    </>
  );
}

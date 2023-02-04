import Head from "next/head";
import { Inter } from "@next/font/google";
import MainLayout from "@/components/MainLayout";

const inter = Inter({ subsets: ["latin"] });

type NoteItem = {
  title?: string;
  explanation?: string;
  url?: string;
};

function addNote(noteItems: NoteItem[]) {
  const newNoteItem: NoteItem = {};
  noteItems.push(newNoteItem);
  alert(noteItems.length);
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
        <div>
          <p>Hello</p>
          <button onClick={(e) => addNote(noteItems)} className=""></button>
        </div>
      </MainLayout>
    </>
  );
}

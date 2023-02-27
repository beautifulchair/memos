import Head from "next/head";
import MainLayout from "@/components/MainLayout";
import { useState } from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import { changePublishedDB } from "@/utils/noteItemDB";
import { NoteItem } from "@/utils/noteItem";

type PageProps = {
  dbNoteItems: NoteItem[];
};

export default function Unpublished({ dbNoteItems }: PageProps) {
  // initial noteItems
  const [noteItems, setNoteItems] = useState<NoteItem[]>(dbNoteItems);

  function publishItem(id: number) {
    setNoteItems(noteItems.filter((itm) => itm.id != id));
    changePublishedDB(id, true);
  }

  function publishAll() {
    dbNoteItems.map((item) => {
      publishItem(item.id);
    });
  }

  const NoteItem = ({ item }: { item: NoteItem }) => (
    <div className="">
      <div className="flex">
        <textarea
          className="underline font-bold italic p-0.5"
          rows={1}
          defaultValue={item.title}
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
        />
      </div>
      <textarea
        className="font-light block w-full p-0.5"
        rows={1}
        defaultValue={item.explanation}
      />
    </div>
  );

  const NoteTable = ({ nis }: { nis: NoteItem[] }) => (
    <ol className="list-decimal mt-10">
      {nis
        .filter((itm) => itm.published == false)
        .sort((i1, i2) => i1.id - i2.id)
        .map((item) => (
          <li key={item.id} className="mt-7 border-b-2 border-dashed pb-3">
            <div className="flex">
              <button
                className="rounded-full w-4 h-4 bg-blue-600 border"
                onClick={() => publishItem(item.id)}
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
            onClick={() => publishAll()}
            className="h-10 w-10 bg-green-400 rounded-full ml-4"
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

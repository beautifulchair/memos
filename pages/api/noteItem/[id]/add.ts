import prisma from "@/lib/prisma";
import { NoteItem } from "@/utils/noteGroup";
import { isExistAtId } from "@/utils/noteItemDB";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (await isExistAtId(id, prisma)) {
    //none
  } else {
    const post = await prisma.noteItemData.create({
      data: {
        title: "-",
        explanation: "~",
        url: "",
        published: true,
        id: id,
      },
    });
    res.status(200).json(post);
  }
}

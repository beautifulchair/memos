import prisma from "@/lib/prisma";
import { NoteItem, isExistAtId } from "@/utils/noteItem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = Number(req.query.id);
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

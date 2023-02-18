import prisma from "@/lib/prisma";
import { isExistAtId } from "@/utils/noteItem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (await isExistAtId(id, prisma)) {
    //none
  } else {
    const post = await prisma.noteItem.create({
      data: {
        id: id,
        title: "-",
        explanation: "~",
        url: "",
        published: true,
      },
    });
    res.status(200).json(post);
  }
}

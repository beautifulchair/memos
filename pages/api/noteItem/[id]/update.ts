import prisma from "@/lib/prisma";
import { isExistAtId } from "@/utils/noteItem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (await isExistAtId(id, prisma)) {
    const { title, explanation, url } = req.body;
    const post = await prisma.noteItemData.update({
      where: { id: id },
      data: { title: title, explanation: explanation, url: url },
    });
    res.status(200).json(post);
  } else {
    res.status(200).json({});
  }
}

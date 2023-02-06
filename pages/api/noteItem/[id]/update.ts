import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const item = await prisma.noteItem.findFirst({ where: { id: id } });
  if (item) {
    const { title, explanation, url } = req.body;
    const post = await prisma.noteItem.update({
      where: { id: id },
      data: { title: title, explanation: explanation, url: url },
    });
    res.status(200).json(post);
  } else {
    res.status(200).json({});
  }
}

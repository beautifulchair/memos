import prisma from "@/lib/prisma";
import { isExistAtId } from "@/utils/noteItem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (await isExistAtId(id, prisma)) {
    const { published } = req.body;
    const post = await prisma.noteItem.update({
      where: { id: id },
      data: { published: published },
    });
    res.status(200).json(post);
  } else {
    res.status(200).json({});
  }
}

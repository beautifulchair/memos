import prisma from "@/lib/prisma";
import { isExistAtId } from "@/utils/noteItem";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  if (await isExistAtId(id, prisma)) {
    const { published }: { published?: boolean } = req.body;
    const data = {
      published: published,
    };
    const post = await prisma.noteItem.update({
      where: { id: id },
      data: data,
    });
    res.status(200).json(post);
  } else {
    res.status(200).json({});
  }
}

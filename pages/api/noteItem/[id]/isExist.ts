import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  const post = await prisma.noteItemData.findFirst({
    where: {
      id: id,
    },
  });
  res.status(200).json(post);
}

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const post = await prisma.noteItem.findFirst({
    where: {
      id: id,
    },
  });
  res.status(200).json(post);
}

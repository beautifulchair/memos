import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// PUT /api/publish/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.body.id;
  const { title, explanation, url } = req.body;
  const post = await prisma.noteItem.update({
    where: { id: id },
    data: { title: title, explanation: explanation, url: url },
  });
  res.status(200).json(post);
}

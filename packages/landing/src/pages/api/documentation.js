import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { limit } = req.query;
    const take = limit ? parseInt(limit, 10) : undefined;

    const documentation = await prisma.documentation.findMany({
      orderBy: { updatedAt: "desc" },
      take: take,
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ documentation });
  } catch (error) {
    console.error("Documentation fetch error:", error);
    return res
      .status(500)
      .json({ message: "Unable to load documentation. Please try again later." });
  }
}

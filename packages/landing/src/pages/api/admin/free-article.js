import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const freeArticles = await prisma.freeArticle.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ freeArticles });
  } catch (error) {
    console.error("Admin free-article fetch error:", error);
    return res
      .status(500)
      .json({ message: "Unable to load free article requests. Please try again later." });
  }
}


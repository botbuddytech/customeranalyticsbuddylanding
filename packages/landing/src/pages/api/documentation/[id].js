import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Invalid documentation slug" });
  }

  try {
    // Try to find by slug first (URL-friendly), fallback to ID for backward compatibility
    let doc = await prisma.documentation.findUnique({
      where: { slug: id },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        youtubeUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Fallback to ID if slug not found (for backward compatibility)
    if (!doc && !isNaN(parseInt(id))) {
      doc = await prisma.documentation.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          youtubeUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    if (!doc) {
      return res.status(404).json({ message: "Documentation not found" });
    }

    return res.status(200).json({ documentation: doc });
  } catch (error) {
    console.error("Documentation fetch error:", error);
    return res
      .status(500)
      .json({ message: "Unable to load documentation. Please try again later." });
  }
}

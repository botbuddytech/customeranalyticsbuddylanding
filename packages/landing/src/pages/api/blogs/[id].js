import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Invalid blog slug" });
  }

  try {
    // Try to find by slug first (URL-friendly), fallback to ID for backward compatibility
    let blog = await prisma.blog.findUnique({
      where: { slug: id },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        imageUrl: true,
        youtubeUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Fallback to ID if slug not found (for backward compatibility)
    if (!blog && !isNaN(parseInt(id))) {
      blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          imageUrl: true,
          youtubeUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return res
      .status(500)
      .json({ message: "Unable to load blog. Please try again later." });
  }
}


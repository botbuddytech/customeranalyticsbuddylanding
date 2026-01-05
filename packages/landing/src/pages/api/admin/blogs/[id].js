import { prisma } from "../../../../lib/prisma";
import { generateUniqueSlug } from "../../../../lib/slug";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  try {
    if (req.method === "GET") {
      const blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.status(200).json({ blog });
    }

    if (req.method === "PUT") {
      const { title, content, youtubeUrl } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }

      const slug = await generateUniqueSlug(title, prisma, parseInt(id));

      const blog = await prisma.blog.update({
        where: { id: parseInt(id) },
        data: {
          title: title.trim(),
          slug,
          content: content.trim(),
          youtubeUrl: youtubeUrl?.trim() || null,
        },
      });

      return res.status(200).json({ blog, message: "Blog updated successfully" });
    }

    if (req.method === "DELETE") {
      await prisma.blog.delete({
        where: { id: parseInt(id) },
      });

      return res.status(200).json({ message: "Blog deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Admin blog API error:", error);
    
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}


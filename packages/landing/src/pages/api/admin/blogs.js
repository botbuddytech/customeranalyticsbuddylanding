import { prisma } from "../../../lib/prisma";
import { generateUniqueSlug } from "../../../lib/slug";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
      });

      return res.status(200).json({ blogs });
    }

    if (req.method === "POST") {
      const { title, content, youtubeUrl, imageUrl } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }

      const slug = await generateUniqueSlug(title, prisma);

      const blog = await prisma.blog.create({
        data: {
          title: title.trim(),
          slug,
          content: content.trim(),
          imageUrl: imageUrl?.trim() || null,
          youtubeUrl: youtubeUrl?.trim() || null,
        },
      });

      return res.status(201).json({ blog, message: "Blog created successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Admin blogs API error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}


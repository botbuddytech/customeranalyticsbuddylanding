import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        // Don't include content in list - load individually
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return res
      .status(500)
      .json({ message: "Unable to load blogs. Please try again later." });
  }
}


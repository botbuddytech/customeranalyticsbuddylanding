import { prisma } from "../../../../lib/prisma";
import { generateUniqueSlug } from "../../../../lib/slug";
import { deleteImageFromStorage } from "../../../../lib/supabase-storage";

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
      const { title, content, youtubeUrl, imageUrl, oldImageUrl } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }

      // Get existing blog to check for old image
      const existingBlog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
        select: { imageUrl: true },
      });

      const oldImageToDelete = existingBlog?.imageUrl || null;
      const newImageUrl = imageUrl?.trim() || null;

      // Collect all old images that need to be deleted (avoid duplicates)
      const imagesToDelete = new Set();
      
      // If oldImageUrl is explicitly provided and different from new, add it
      if (oldImageUrl && oldImageUrl.trim() && oldImageUrl !== newImageUrl) {
        imagesToDelete.add(oldImageUrl.trim());
      }
      
      // If existing blog has an image and it's different from new, add it
      if (oldImageToDelete && oldImageToDelete !== newImageUrl) {
        imagesToDelete.add(oldImageToDelete);
      }

      // Delete all old images
      for (const imageToDelete of imagesToDelete) {
        const deleteResult = await deleteImageFromStorage(imageToDelete);
        if (!deleteResult.success) {
          console.error(`Failed to delete old image (${imageToDelete}):`, deleteResult.error);
          // Don't fail the request, just log the error
        } else {
          console.log(`Successfully deleted old image: ${imageToDelete}`);
        }
      }

      const slug = await generateUniqueSlug(title, prisma, parseInt(id));

      const blog = await prisma.blog.update({
        where: { id: parseInt(id) },
        data: {
          title: title.trim(),
          slug,
          content: content.trim(),
          imageUrl: imageUrl?.trim() || null,
          youtubeUrl: youtubeUrl?.trim() || null,
        },
      });

      return res.status(200).json({ blog, message: "Blog updated successfully" });
    }

    if (req.method === "DELETE") {
      // Get blog to find image URL before deleting
      const blog = await prisma.blog.findUnique({
        where: { id: parseInt(id) },
        select: { imageUrl: true },
      });

      // Delete the blog
      await prisma.blog.delete({
        where: { id: parseInt(id) },
      });

      // Delete associated image from storage
      if (blog?.imageUrl) {
        await deleteImageFromStorage(blog.imageUrl);
      }

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


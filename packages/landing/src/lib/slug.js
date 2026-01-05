/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a number if needed
 */
export async function generateUniqueSlug(title, prisma, excludeId = null) {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.blog.findUnique({
      where: { slug },
      select: { id: true },
    });

    // If no existing blog with this slug, or it's the same blog we're updating
    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug;
    }

    // Append counter to make it unique
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}


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
 * @param {string} title - The title to generate slug from
 * @param {PrismaClient} prisma - Prisma client instance
 * @param {number|null} excludeId - ID to exclude from uniqueness check (for updates)
 * @param {string} model - Model name: 'blog' or 'documentation' (default: 'blog')
 */
export async function generateUniqueSlug(title, prisma, excludeId = null, model = 'blog') {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let existing;
    
    if (model === 'documentation') {
      existing = await prisma.documentation.findUnique({
        where: { slug },
        select: { id: true },
      });
    } else {
      existing = await prisma.blog.findUnique({
        where: { slug },
        select: { id: true },
      });
    }

    // If no existing item with this slug, or it's the same item we're updating
    if (!existing || (excludeId && existing.id === excludeId)) {
      return slug;
    }

    // Append counter to make it unique
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}


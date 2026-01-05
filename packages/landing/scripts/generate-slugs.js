/**
 * Script to generate slugs for existing blogs that don't have slugs
 * Run this after adding the slug column to populate existing records
 */

const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Create a single pg pool for the script
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function generateUniqueSlug(title, excludeId = null) {
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

async function main() {
  console.log('Generating slugs for existing blogs...');

  const blogs = await prisma.blog.findMany({
    where: {
      slug: null,
    },
  });

  console.log(`Found ${blogs.length} blogs without slugs`);

  for (const blog of blogs) {
    const slug = await generateUniqueSlug(blog.title, blog.id);
    
    await prisma.blog.update({
      where: { id: blog.id },
      data: { slug },
    });

    console.log(`✓ Generated slug "${slug}" for blog: ${blog.title}`);
  }

  console.log('\n✅ All slugs generated successfully!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


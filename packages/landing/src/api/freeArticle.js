import { prisma } from "../lib/prisma";

/**
 * Create a FreeArticle request row.
 */
export async function createFreeArticleRequest(payload) {
  const { name, email, subject, message } = payload || {};

  if (!email) {
    throw new Error("Email is required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  return prisma.freeArticle.create({
    data: {
      email: normalizedEmail,
      name: name?.trim() || null,
      subject: subject?.trim() || null,
      message: message?.trim() || null,
    },
  });
}



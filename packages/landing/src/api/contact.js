import { prisma } from "../lib/prisma";

/**
 * Create a ContactMessage row.
 */
export async function createContactMessage(payload) {
  const { name, email, subject, message } = payload || {};

  if (!email) {
    throw new Error("Email is required");
  }

  const normalizedEmail = email.trim().toLowerCase();

  return prisma.contactMessage.create({
    data: {
      email: normalizedEmail,
      name: name?.trim() || null,
      subject: subject?.trim() || null,
      message: message?.trim() || null,
    },
  });
}




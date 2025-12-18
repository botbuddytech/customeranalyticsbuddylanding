import { prisma } from '../lib/prisma';

/**
 * Create or find a lead by email.
 * Returns { lead, created } where created=true if a new row was inserted.
 */
export async function createLead(email) {
  if (!email) {
    throw new Error('Email is required');
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const lead = await prisma.leads.create({
      data: {
        email: normalizedEmail,
      },
    });

    return { lead, created: true };
  } catch (error) {
    // Unique constraint violation (email already exists)
    if (error.code === 'P2002') {
      const existing = await prisma.leads.findUnique({
        where: { email: normalizedEmail },
      });
      return { lead: existing, created: false };
    }

    throw error;
  }
}



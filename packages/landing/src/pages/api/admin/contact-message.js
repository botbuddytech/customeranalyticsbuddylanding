import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const contactMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ contactMessages });
  } catch (error) {
    console.error("Admin contact-message fetch error:", error);
    return res.status(500).json({
      message:
        "Unable to load contact messages. Please try again later.",
    });
  }
}



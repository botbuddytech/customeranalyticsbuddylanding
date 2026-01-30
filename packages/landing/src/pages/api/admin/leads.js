import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const leads = await prisma.leads.findMany({
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ leads });
  } catch (error) {
    console.error("Admin leads fetch error:", error);
    return res
      .status(500)
      .json({ message: "Unable to load leads. Please try again later." });
  }
}



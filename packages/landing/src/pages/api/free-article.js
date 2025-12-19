import { createFreeArticleRequest } from "../../api/freeArticle";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const entry = await createFreeArticleRequest({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message:
        "Thanks! We have saved your request and will send the free article to your email shortly.",
      id: entry.id,
    });
  } catch (error) {
    console.error("FreeArticle save error:", error);
    return res.status(500).json({
      message:
        error.message ||
        "Unable to save your request right now. Please try again later.",
    });
  }
}



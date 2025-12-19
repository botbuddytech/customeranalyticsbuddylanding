import {
  sendFreeArticleEmail,
  notifyOwnerOfRequest,
} from "../../api/email/freeArticle";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject } = req.body;

  if (!to) {
    return res.status(400).json({ error: "Recipient email (to) is required" });
  }

  try {
    await sendFreeArticleEmail(to, subject);
    await notifyOwnerOfRequest(to);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Gmail email error:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}

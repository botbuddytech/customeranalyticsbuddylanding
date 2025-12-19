import { createLead } from "../../api/leads";
import {
  sendFreeArticleEmail,
  notifyOwnerOfRequest,
} from "../../api/email/freeArticle";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const { created } = await createLead(email);

    // Send free article email and notify owner directly (no extra HTTP roundtrip)
    await sendFreeArticleEmail(
      email,
      "Your BotBuddy Customer Analytics article"
    );
    await notifyOwnerOfRequest(email);

    return res.status(created ? 201 : 200).json({
      message: created
        ? "Thanks! We will send you an article to your email."
        : "This email is already registered.",
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message ||
        "Unable to save your email right now. Please try again later.",
    });
  }
}

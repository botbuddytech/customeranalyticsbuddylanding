import { resend } from "../../lib/resend";
import { renderWelcomeArticleEmail } from "../../api/email/templates/welcomeArticleTemplate";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject } = req.body;

  if (!to) {
    return res.status(400).json({ error: "Recipient email (to) is required" });
  }

  try {
    const html = renderWelcomeArticleEmail();

    // Try to attach a static PDF from the public folder (e.g., /public/botbuddy-article.pdf)
    // Make sure you place your PDF file at that path in the project.
    let attachments = [];
    try {
      const pdfPath = path.join(
        process.cwd(),
        "public",
        "botbuddy-article.pdf"
      );
      const pdfBuffer = fs.readFileSync(pdfPath);
      attachments.push({
        filename: "BotBuddy-Article.pdf",
        content: pdfBuffer,
      });
    } catch (err) {
      console.error("PDF attachment could not be loaded:", err);
    }

    const data = await resend.emails.send({
      from: "Landing <onboarding@resend.dev>", // temp domain
      to,
      subject: subject || "Your BotBuddy Customer Analytics article",
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Resend email error:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}

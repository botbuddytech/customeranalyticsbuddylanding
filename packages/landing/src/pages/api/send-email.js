import { mailer } from "../../lib/mailer";
import { renderWelcomeArticleEmail } from "../../api/email/templates/welcomeArticleTemplate";
import fs from "fs";
import path from "path";

function loadPdfAttachment() {
  const attachments = [];

  try {
    const pdfPath = path.join(process.cwd(), "public", "botbuddy-article.pdf");

    if (fs.existsSync(pdfPath)) {
      attachments.push({
        filename: "BotBuddy-Article.pdf",
        path: pdfPath,
      });
    }
  } catch (err) {
    console.error("PDF attachment error:", err);
  }

  return attachments;
}

async function sendFreeArticleEmail(to, subjectOverride) {
  const html = renderWelcomeArticleEmail();
  const attachments = loadPdfAttachment();

  await mailer.sendMail({
    from: `"BotBuddy" <${process.env.GMAIL_USER}>`,
    to,
    subject: subjectOverride || "Your BotBuddy Customer Analytics article",
    html,
    attachments,
  });
}

async function notifyOwnerOfRequest(userEmail) {
  if (!process.env.GMAIL_USER) return;

  await mailer.sendMail({
    from: `"BotBuddy" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "New free article request",
    text: `A new user requested the free article.\n\nEmail: ${userEmail}`,
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject } = req.body;

  if (!to) {
    return res.status(400).json({ error: "Recipient email (to) is required" });
  }

  try {
    // 1) Send the free article to the user
    await sendFreeArticleEmail(to, subject);

    // 2) Notify internal inbox that someone requested the article
    await notifyOwnerOfRequest(to);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Gmail email error:", error);
    return res.status(500).json({ error: "Email failed" });
  }
}

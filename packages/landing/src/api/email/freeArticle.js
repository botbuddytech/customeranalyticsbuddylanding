import { mailer } from "../../lib/mailer";
import { renderWelcomeArticleEmail } from "./templates/welcomeArticleTemplate";
import fs from "fs";
import path from "path";

/**
 * Load PDF attachment from the public folder.
 */
function loadPdfAttachment() {
  const attachments = [];
  try {
    // Try multiple possible paths for different environments
    const possiblePaths = [
      path.join(process.cwd(), "public", "botbuddy-article.pdf"),
      path.join(process.cwd(), "packages", "landing", "public", "botbuddy-article.pdf"),
      path.join(__dirname, "..", "..", "..", "public", "botbuddy-article.pdf"),
    ];

    let pdfPath = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        pdfPath = possiblePath;
        break;
      }
    }

    if (pdfPath) {
      attachments.push({
        filename: "BotBuddy-Article.pdf",
        path: pdfPath,
      });
      console.log("PDF attachment found at:", pdfPath);
    } else {
      console.warn("PDF attachment not found. Tried paths:", possiblePaths);
      console.warn("Current working directory:", process.cwd());
    }
  } catch (err) {
    console.error("PDF attachment error:", err);
  }
  return attachments;
}

/**
 * Send the free article email to the subscriber.
 */
export async function sendFreeArticleEmail(to, subjectOverride) {
  if (!to) {
    throw new Error("Email is required");
  }

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

/**
 * Notify the owner that a new lead has been captured.
 */
export async function notifyOwnerOfRequest(userEmail) {
  if (!process.env.GMAIL_USER) return;

  await mailer.sendMail({
    from: `"BotBuddy" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "New free article request",
    text: `A new user requested your free article.\n\nEmail: ${userEmail}`,
  });
}

/**
 * Notify the owner that a new query has been raised in the Free Article page.
 */
export async function notifyOwnerOfFreeArticleQuery(queryData) {
  if (!process.env.GMAIL_USER) return;

  const { name, email, subject, message } = queryData || {};

  const emailBody = `A new query has been raised in the Free Article page.\n\n` +
    `Name: ${name || "Not provided"}\n` +
    `Email: ${email || "Not provided"}\n` +
    `Subject: ${subject || "Not provided"}\n` +
    `Message: ${message || "Not provided"}\n`;

  await mailer.sendMail({
    from: `"BotBuddy" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    subject: "New query raised in Free Article page",
    text: emailBody,
  });
}



import { mailer } from "../../lib/mailer";
import { renderWelcomeArticleEmail } from "./templates/welcomeArticleTemplate";
import fs from "fs";
import path from "path";

/**
 * Load PDF attachment from the assets folder (bundled with code).
 * This ensures the PDF is always available in serverless environments.
 */
function loadPdfAttachment() {
  const attachments = [];
  try {
    // Use relative path from this file to the assets folder
    // This file is at: src/api/email/freeArticle.js
    // PDF is at: src/assets/pdf/botbuddy-article.pdf
    const pdfPath = path.join(__dirname, "..", "..", "assets", "pdf", "botbuddy-article.pdf");
    
    if (fs.existsSync(pdfPath)) {
      // Read file as buffer for reliable serverless compatibility
      const fileBuffer = fs.readFileSync(pdfPath);
      attachments.push({
        filename: "BotBuddy-Article.pdf",
        content: fileBuffer,
      });
      console.log("PDF attachment loaded successfully from:", pdfPath);
    } else {
      console.warn("PDF attachment not found at:", pdfPath);
      console.warn("__dirname:", __dirname);
      console.warn("Attempted path:", pdfPath);
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



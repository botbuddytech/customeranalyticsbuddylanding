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
    const cwd = process.cwd();
    
    // Try multiple paths - in Vercel, source files are at the root of the package
    const possiblePaths = [
      // Production/Vercel: source files are at process.cwd()/src
      path.join(cwd, "src", "assets", "pdf", "botbuddy-article.pdf"),
      // Standalone output structure
      path.join(cwd, ".next", "standalone", "packages", "landing", "src", "assets", "pdf", "botbuddy-article.pdf"),
      // If cwd is already in .next, go up
      path.join(cwd, "..", "..", "src", "assets", "pdf", "botbuddy-article.pdf"),
      // Development: direct from cwd
      path.join(cwd, "assets", "pdf", "botbuddy-article.pdf"),
      // Relative from __dirname (fallback - goes up from .next/server/chunks)
      path.join(__dirname, "..", "..", "..", "..", "src", "assets", "pdf", "botbuddy-article.pdf"),
      path.join(__dirname, "..", "..", "..", "..", "..", "src", "assets", "pdf", "botbuddy-article.pdf"),
    ];

    let pdfPath = null;
    for (const possiblePath of possiblePaths) {
      try {
        const normalizedPath = path.resolve(possiblePath);
        if (fs.existsSync(normalizedPath)) {
          pdfPath = normalizedPath;
          break;
        }
      } catch (checkErr) {
        continue;
      }
    }
    
    // If still not found, try to find it by walking up from __dirname
    if (!pdfPath) {
      try {
        let currentDir = __dirname;
        for (let i = 0; i < 10; i++) {
          const testPath = path.join(currentDir, "src", "assets", "pdf", "botbuddy-article.pdf");
          if (fs.existsSync(testPath)) {
            pdfPath = testPath;
            break;
          }
          const parentDir = path.dirname(currentDir);
          if (parentDir === currentDir) break; // Reached root
          currentDir = parentDir;
        }
      } catch (walkErr) {
        // Ignore walk errors
      }
    }

    if (pdfPath) {
      // Read file as buffer for reliable serverless compatibility
      const fileBuffer = fs.readFileSync(pdfPath);
      attachments.push({
        filename: "BotBuddy-Article.pdf",
        content: fileBuffer,
      });
      console.log("PDF attachment loaded successfully from:", pdfPath);
    } else {
      console.warn("PDF attachment not found. Tried paths:", possiblePaths);
      console.warn("Current working directory:", cwd);
      console.warn("__dirname:", __dirname);
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



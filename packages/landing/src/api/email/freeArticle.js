import { mailer } from "../../lib/mailer";
import { renderWelcomeArticleEmail } from "./templates/welcomeArticleTemplate";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

/**
 * Load PDF attachment from the public folder.
 */
async function loadPdfAttachment() {
  const attachments = [];
  try {
    const cwd = process.cwd();
    const dirname = __dirname;
    
    // Try multiple possible paths for different environments
    const possiblePaths = [
      // Standard Next.js public folder
      path.join(cwd, "public", "botbuddy-article.pdf"),
      // Next.js standalone output (Vercel production)
      path.join(cwd, ".next", "standalone", "packages", "landing", "public", "botbuddy-article.pdf"),
      path.join(cwd, ".next", "standalone", "public", "botbuddy-article.pdf"),
      // Relative to current file location
      path.join(dirname, "..", "..", "..", "public", "botbuddy-article.pdf"),
      path.join(dirname, "..", "..", "..", "..", "public", "botbuddy-article.pdf"),
      // Monorepo structure
      path.join(cwd, "packages", "landing", "public", "botbuddy-article.pdf"),
      // Vercel serverless function path (if file is copied)
      path.join("/var/task", "public", "botbuddy-article.pdf"),
      path.join("/var/task", "packages", "landing", "public", "botbuddy-article.pdf"),
    ];

    let pdfPath = null;
    for (const possiblePath of possiblePaths) {
      try {
        if (fs.existsSync(possiblePath)) {
          pdfPath = possiblePath;
          break;
        }
      } catch (checkErr) {
        // Continue to next path if this one fails
        continue;
      }
    }

    if (pdfPath) {
      attachments.push({
        filename: "BotBuddy-Article.pdf",
        path: pdfPath,
      });
      console.log("PDF attachment found at:", pdfPath);
    } else {
      // Fallback: Try to fetch from URL if file not found on disk
      // This works in Vercel where public files are served via CDN
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                     process.env.NEXTAUTH_URL || 
                     (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);
      
      if (baseUrl) {
        const pdfUrl = `${baseUrl}/botbuddy-article.pdf`;
        console.log("Attempting to fetch PDF from URL:", pdfUrl);
        
        try {
          const fileBuffer = await new Promise((resolve, reject) => {
            const client = pdfUrl.startsWith('https') ? https : http;
            client.get(pdfUrl, (res) => {
              if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch PDF: ${res.statusCode}`));
                return;
              }
              const chunks = [];
              res.on('data', (chunk) => chunks.push(chunk));
              res.on('end', () => resolve(Buffer.concat(chunks)));
              res.on('error', reject);
            }).on('error', reject);
          });
          
          attachments.push({
            filename: "BotBuddy-Article.pdf",
            content: fileBuffer,
          });
          console.log("PDF attachment loaded from URL successfully");
        } catch (urlErr) {
          console.warn("Failed to fetch PDF from URL:", urlErr.message);
          console.warn("PDF attachment not found. Tried paths:", possiblePaths);
          console.warn("Current working directory:", cwd);
          console.warn("__dirname:", dirname);
        }
      } else {
        console.warn("PDF attachment not found. Tried paths:", possiblePaths);
        console.warn("Current working directory:", cwd);
        console.warn("__dirname:", dirname);
        console.warn("No base URL available for fallback fetch");
      }
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
  const attachments = await loadPdfAttachment();

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



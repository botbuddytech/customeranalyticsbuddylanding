import { createLead } from "../../api/leads";

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

    // Fire-and-forget email sending using the template-based send-email API.
    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    fetch(`${baseUrl}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Your BotBuddy Customer Analytics article",
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text().catch(() => "");
          console.error(
            "Background email send failed with status:",
            response.status,
            text
          );
        }
      })
      .catch((err) => {
        console.error("Background email send failed:", err);
      });

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

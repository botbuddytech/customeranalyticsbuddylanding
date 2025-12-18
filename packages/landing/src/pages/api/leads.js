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
    fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Your BotBuddy Customer Analytics article",
        }),
      }
    ).catch((err) => {
      console.error("Background email send failed:", err);
    });

    return res.status(created ? 201 : 200).json({
      message: created
        ? "Thanks! We will send you an article to your email."
        : "This email is already registered.",
    });
  } catch (error) {
    console.error("Lead creation error:", error);
    return res.status(500).json({
      message: "Unable to save your email right now. Please try again later.",
    });
  }
}

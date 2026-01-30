import { createContactMessage } from "../../api/contact";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, message } = req.body || {};

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const entry = await createContactMessage({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message:
        "Thanks! We have received your message and will get back to you soon.",
      id: entry.id,
    });
  } catch (error) {
    console.error("Contact save error:", error);
    return res.status(500).json({
      message:
        error.message ||
        "Unable to save your message right now. Please try again later.",
    });
  }
}



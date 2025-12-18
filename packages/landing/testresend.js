/* eslint-disable unicorn/prefer-module */
// testresend.js (CommonJS script used only for manual email testing)

const { Resend } = require("resend");

const resend = new Resend("re_75ZCgrtm_Mz1dTtBr1DAQCDnib1SYTFEG");

async function main() {
  const data = await resend.emails.send({
    from: "Landing <onboarding@resend.dev>",
    to: "you@example.com",
    subject: "Test from BotBuddy",
    html: "<p>This is a test email.</p>",
  });

  console.log("Email sent:", data);
}

main().catch((err) => {
  console.error("Error sending test email:", err);
});

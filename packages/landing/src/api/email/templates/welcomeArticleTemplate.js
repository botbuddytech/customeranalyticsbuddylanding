const CTA_URL = "";

function renderCtaButton() {
  const baseStyle =
    "display: inline-block; padding: 13px 34px; background-color: #95bf47; color: #ffffff; font-size: 16px; font-weight: 600; border-radius: 8px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-shadow: 0 2px 8px rgba(149, 191, 71, 0.3);";

  if (!CTA_URL) {
    // Not clickable if no URL is configured
    return `<span style="${baseStyle} opacity: 0.7; cursor: default;">
      Let's Connect
    </span>`;
  }

  return `<a href="${CTA_URL}" style="${baseStyle} text-decoration: none;">
    Let's Connect
  </a>`;
}

export function renderWelcomeArticleEmail() {
  const ctaButton = renderCtaButton();

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BotBuddy</title>
    <style>
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                max-width: 100% !important;
            }
            .content-padding {
                padding: 20px 24px 24px !important;
            }
            .header-padding {
                padding: 24px 24px !important;
            }
            .footer-padding {
                padding: 20px 24px !important;
            }
            .highlight-box {
                padding: 16px !important;
            }
            .beta-notice {
                padding: 14px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" class="email-container" style="max-width: 720px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    
                    <!-- Header with brand color -->
                    <tr>
                        <td class="header-padding" style="background: linear-gradient(135deg, #95bf47 0%, #7dab39 100%); padding: 28px 60px; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; text-align: center; letter-spacing: -0.5px;">
                                Welcome to BotBuddy
                            </h1>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="content-padding" style="padding: 24px 60px 28px;">
                            <p style="margin: 0 0 14px; color: #4b5563; font-size: 16px; line-height: 1.5; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                Hi,
                            </p>
                            
                            <p style="margin: 0 0 14px; color: #4b5563; font-size: 16px; line-height: 1.5; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                Thanks for grabbing our free guide on BotBuddy—hope it gave you some actionable ideas right away.
                            </p>
                            
                            <p style="margin: 0 0 14px; color: #4b5563; font-size: 16px; line-height: 1.5; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                I'm curious—what's your biggest customer insight challenge right now? Whether it's finding your VIPs, reducing churn, or simply moving beyond basic reports, I'd love to hear what you're facing.
                            </p>
                            
                            <!-- Highlight Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 18px 0;">
                                <tr>
                                    <td class="highlight-box" style="padding: 18px; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 8px; border-left: 4px solid #95bf47;">
                                        <p style="margin: 0; color: #1e40af; font-size: 15px; line-height: 1.5; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                            If you're ready to move from spreadsheets to smart insights, our Customer Analytics Buddy app helps merchants do exactly what we covered in the article—but in seconds, not hours. You can filter, segment, and ask AI-powered questions directly inside Shopify.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 20px; color: #4b5563; font-size: 16px; line-height: 1.5; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                Want me to send over a quick demo link or answer any questions?
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                                <tr>
                                    <td align="center">
                                        ${ctaButton}
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 0 0 18px; color: #4b5563; font-size: 15px; line-height: 1.4; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                Talk soon,<br>
                                Founder, BotBuddy
                            </p>
                            
                            <!-- Beta Notice -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td class="beta-notice" style="padding: 16px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                        <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.4; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                                            P.S. — We are currently in the beta stage of our app development and provide full free access to our early users untill we go live , no credit card needed. If you're up for it, let's connect.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer-padding" style="background-color: #111827; padding: 20px 60px; text-align: center;">
                            <p style="margin: 0; color: #9ca3af; font-size: 13px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.3;">
                                You're receiving this email because you downloaded our free guide on BotBuddy.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

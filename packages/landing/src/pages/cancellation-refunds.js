import React, { Fragment } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { theme } from 'common/theme/webAppCreative';
import ResetCSS from 'common/assets/css/style';
import { GlobalStyle, ContentWrapper } from 'containers/WebAppCreative/webAppCreative.style';
import Navbar from 'containers/WebAppCreative/Navbar';
import Footer from 'containers/WebAppCreative/Footer';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import { Section, ContentSection } from '../containers/WebAppCreative/PrivacyPolicy/privacy-policy.style';

const CancellationRefunds = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Cancellation & Refunds - BotBuddy Customer Analytics | Flexible Refund Policy</title>
          <meta name="description" content="Cancellation & Refunds Policy for BotBuddy Customer Analytics. Cancel anytime, no questions asked. Flexible refund policy for SaaS services with instant processing." />
          <meta name="keywords" content="BotBuddy refund policy, cancel subscription, SaaS refunds, flexible cancellation, no questions asked refund, instant refund processing" />
          <meta name="robots" content="index, follow" />
          
          {/* Structured Data for Cancellation & Refunds Policy */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Cancellation & Refunds - BotBuddy Customer Analytics",
                "description": "Flexible cancellation and refund policy for BotBuddy Customer Analytics SaaS platform",
                "url": "https://botbuddy-analytics.com/cancellation-refunds",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "BotBuddy Customer Analytics",
                  "url": "https://botbuddy-analytics.com"
                },
                "dateModified": "2024-12-19",
                "inLanguage": "en-US"
              })
            }}
          />
          
          {/* Load google fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope:wght@400;500;700;800&display=swap"
          />
        </Head>
        
        <ResetCSS />
        <GlobalStyle />

        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>

          <Section>
            <Container width="1400px">
              <ContentSection>
                <Heading as="h1" content="Cancellation & Refunds Policy" />
                <Text content="Last updated: December 2024" />

                <Heading as="h2" content="1. Our Commitment to You" />
                <Text content="At BotBuddy Customer Analytics, we believe in complete customer satisfaction. We offer one of the most flexible cancellation and refund policies in the SaaS industry. You can cancel your subscription at any time, for any reason, with no questions asked." />

                <Heading as="h2" content="2. Cancellation Policy - Cancel Anytime" />
                <Text content="You have complete freedom to cancel your BotBuddy subscription:" />
                <ul>
                  <li><strong>No Questions Asked:</strong> Cancel for any reason without explanation or justification</li>
                  <li><strong>Instant Cancellation:</strong> Your subscription can be cancelled immediately from your account dashboard</li>
                  <li><strong>No Cancellation Fees:</strong> Zero fees or penalties for cancelling your subscription</li>
                  <li><strong>No Minimum Commitment:</strong> No long-term contracts or minimum subscription periods</li>
                  <li><strong>Easy Process:</strong> Simple one-click cancellation process</li>
                </ul>

                <Heading as="h2" content="3. Refund Policy - 100% Money Back Guarantee" />
                <Text content="We offer a comprehensive refund policy designed to protect your investment:" />
                <ul>
                  <li><strong>Full Refund Available:</strong> Get 100% of your money back, no questions asked</li>
                  <li><strong>No Time Restrictions:</strong> Request a refund at any point during your subscription</li>
                  <li><strong>Instant Processing:</strong> Refunds are processed within 24-48 hours of request</li>
                  <li><strong>Multiple Refund Options:</strong> Choose between account credit or original payment method</li>
                  <li><strong>Pro-rated Refunds:</strong> Receive refunds for unused portions of your subscription</li>
                </ul>

                <Heading as="h2" content="4. How to Cancel Your Subscription" />
                <Text content="Cancelling your BotBuddy subscription is simple and straightforward:" />
                <ul>
                  <li><strong>Account Dashboard:</strong> Log into your BotBuddy account and navigate to billing settings</li>
                  <li><strong>One-Click Cancel:</strong> Click the "Cancel Subscription" button</li>
                  <li><strong>Confirmation:</strong> Confirm your cancellation in the popup dialog</li>
                  <li><strong>Immediate Effect:</strong> Your subscription is cancelled instantly</li>
                  <li><strong>Email Confirmation:</strong> Receive confirmation email within minutes</li>
                </ul>

                <Heading as="h2" content="5. How to Request a Refund" />
                <Text content="Getting your money back is just as easy as cancelling:" />
                <ul>
                  <li><strong>Contact Support:</strong> Email us at botbuddyteam@gmail.com or call +91 9669664421</li>
                  <li><strong>Simple Request:</strong> Just say "I'd like a refund" - no explanation needed</li>
                  <li><strong>Quick Processing:</strong> We process refunds within 24-48 hours</li>
                  <li><strong>Multiple Methods:</strong> Refund to original payment method or account credit</li>
                  <li><strong>Full Transparency:</strong> Receive detailed refund confirmation and timeline</li>
                </ul>

                <Heading as="h2" content="6. Refund Processing Timeline" />
                <Text content="We understand that time is valuable, so we process refunds quickly:" />
                <ul>
                  <li><strong>Request Processing:</strong> 1-2 hours during business hours</li>
                  <li><strong>Payment Processing:</strong> 24-48 hours for credit card refunds</li>
                  <li><strong>Bank Transfers:</strong> 3-5 business days for bank account refunds</li>
                  <li><strong>Account Credits:</strong> Instant processing for account credit refunds</li>
                  <li><strong>Confirmation:</strong> Email notification when refund is processed</li>
                </ul>

                <Heading as="h2" content="7. What Happens After Cancellation" />
                <Text content="After cancelling your subscription, here's what you can expect:" />
                <ul>
                  <li><strong>Immediate Access:</strong> Continue using BotBuddy until the end of your billing period</li>
                  <li><strong>Data Export:</strong> Export all your analytics data before access expires</li>
                  <li><strong>Grace Period:</strong> 30-day grace period to reactivate your account</li>
                  <li><strong>Data Retention:</strong> Your data is securely stored for 90 days after cancellation</li>
                  <li><strong>Easy Reactivation:</strong> Reactivate anytime with one click</li>
                </ul>

                <Heading as="h2" content="8. Special Circumstances" />
                <Text content="We understand that sometimes things don't work out as planned:" />
                <ul>
                  <li><strong>Technical Issues:</strong> Full refund if you experience technical problems</li>
                  <li><strong>Feature Changes:</strong> Refund if we remove features you rely on</li>
                  <li><strong>Service Interruption:</strong> Pro-rated refunds for any service downtime</li>
                  <li><strong>Billing Errors:</strong> Immediate refund for any billing mistakes on our part</li>
                  <li><strong>Dissatisfaction:</strong> Full refund if you're not satisfied with our service</li>
                </ul>

                <Heading as="h2" content="9. No Questions Asked Policy" />
                <Text content="We truly mean it when we say 'no questions asked':" />
                <ul>
                  <li><strong>No Interrogation:</strong> We won't ask why you're cancelling or requesting a refund</li>
                  <li><strong>No Retention Attempts:</strong> No pressure to stay or special offers to convince you</li>
                  <li><strong>No Surveys:</strong> No exit surveys or feedback forms required</li>
                  <li><strong>No Conditions:</strong> No conditions or requirements for refunds</li>
                  <li><strong>Respectful Process:</strong> We respect your decision and make it easy to leave</li>
                </ul>

                <Heading as="h2" content="10. Account Credit Option" />
                <Text content="If you prefer, we can provide account credits instead of refunds:" />
                <ul>
                  <li><strong>Instant Credit:</strong> Account credits are applied immediately</li>
                  <li><strong>Flexible Use:</strong> Use credits for future BotBuddy subscriptions</li>
                  <li><strong>No Expiration:</strong> Credits never expire</li>
                  <li><strong>Transferable:</strong> Credits can be transferred to other accounts</li>
                  <li><strong>Partial Use:</strong> Use credits for partial subscriptions or upgrades</li>
                </ul>

                <Heading as="h2" content="11. Our Promise to You" />
                <Text content="We promise to make the cancellation and refund process as simple and painless as possible:" />
                <ul>
                  <li><strong>No Hassle:</strong> Simple, straightforward process with no complications</li>
                  <li><strong>Fast Processing:</strong> Quick turnaround times for all requests</li>
                  <li><strong>Full Transparency:</strong> Clear communication about refund status and timeline</li>
                  <li><strong>Customer Service:</strong> Friendly, helpful support throughout the process</li>
                  <li><strong>Your Satisfaction:</strong> Our goal is your complete satisfaction, even if you choose to leave</li>
                </ul>

                <Heading as="h2" content="12. Contact Us for Refunds" />
                <Text content="Ready to request a refund or have questions about our policy? We're here to help:" />
                <ul>
                  <li><strong>Email:</strong> botbuddyteam@gmail.com</li>
                  <li><strong>Phone:</strong> +91 9669664421</li>
                  <li><strong>Address:</strong> West Bengal, India</li>
                  <li><strong>Response Time:</strong> We respond to all refund requests within 2 hours</li>
                  <li><strong>Business Hours:</strong> 24/7 support for refund requests</li>
                </ul>

                <Heading as="h2" content="13. Changes to This Policy" />
                <Text content="We may update this Cancellation & Refunds Policy from time to time. Any changes will be communicated to you via email and will be posted on this page. We will never make changes that are less favorable to you without your explicit consent." />

                <Heading as="h2" content="14. Your Rights" />
                <Text content="You have the right to:" />
                <ul>
                  <li><strong>Cancel Anytime:</strong> Cancel your subscription at any time without penalty</li>
                  <li><strong>Request Refunds:</strong> Request a refund at any time during your subscription</li>
                  <li><strong>Export Data:</strong> Export all your data before cancellation</li>
                  <li><strong>Fair Treatment:</strong> Be treated with respect and courtesy throughout the process</li>
                  <li><strong>Clear Communication:</strong> Receive clear, honest communication about all policies</li>
                </ul>
              </ContentSection>
            </Container>
          </Section>
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default CancellationRefunds;

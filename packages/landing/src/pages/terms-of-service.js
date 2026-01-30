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

const TermsOfService = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Terms of Service - BotBuddy Customer Analytics | User Agreement & Conditions</title>
          <meta name="description" content="Terms of Service for BotBuddy Customer Analytics. Read our user agreement, terms and conditions for using our Shopify analytics and customer segmentation platform." />
          <meta name="keywords" content="BotBuddy terms of service, user agreement, terms and conditions, Shopify app terms, analytics platform terms" />
          <meta name="robots" content="index, follow" />
          
          {/* Structured Data for Terms of Service */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Terms of Service - BotBuddy Customer Analytics",
                "description": "Terms of Service and User Agreement for BotBuddy Customer Analytics platform",
                "url": "https://botbuddy-analytics.com/terms-of-service",
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
              <Heading as="h1" content="Terms of Service" />
              <Text content="Last updated: December 2024" />
              
              <Heading as="h2" content="1. Acceptance of Terms" />
              <Text content="By accessing and using BotBuddy Customer Analytics ('the Service'), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service." />
              
              <Heading as="h2" content="2. Description of Service" />
              <Text content="BotBuddy Customer Analytics is a Shopify app that provides customer analytics, segmentation, and marketing insights for e-commerce businesses. The Service includes data analysis, reporting, and integration with Shopify stores." />
              
              <Heading as="h2" content="3. User Accounts" />
              <Text content="To use our Service, you must:" />
              <ul>
                <li>Be at least 18 years old or have parental consent</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be responsible for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              
              <Heading as="h2" content="4. Acceptable Use" />
              <Text content="You agree not to use the Service to:" />
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the Service for any unlawful or prohibited purpose</li>
                <li>Interfere with the proper functioning of the Service</li>
              </ul>
              
              <Heading as="h2" content="5. Data and Privacy" />
              <Text content="Your use of the Service is also governed by our Privacy Policy. By using the Service, you consent to the collection and use of information as outlined in our Privacy Policy. We are committed to protecting your data and maintaining your privacy." />
              
              <Heading as="h2" content="6. Payment and Billing" />
              <Text content="Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days' notice to existing customers." />
              
              <Heading as="h2" content="7. Intellectual Property" />
              <Text content="The Service and its original content, features, and functionality are owned by BotBuddy and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws." />
              
              <Heading as="h2" content="8. Service Availability" />
              <Text content="We strive to maintain high service availability but do not guarantee uninterrupted access. We may perform maintenance, updates, or modifications that temporarily affect service availability." />
              
              <Heading as="h2" content="9. Limitation of Liability" />
              <Text content="To the maximum extent permitted by law, BotBuddy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses." />
              
              <Heading as="h2" content="10. Termination" />
              <Text content="We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Service will cease immediately." />
              
              <Heading as="h2" content="11. Changes to Terms" />
              <Text content="We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms." />
              
              <Heading as="h2" content="12. Governing Law" />
              <Text content="These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles." />
              
              <Heading as="h2" content="13. Contact Information" />
              <Text content="If you have any questions about these Terms of Service, please contact us:" />
              <ul>
                <li>Email: botbuddyteam@gmail.com</li>
                <li>Address: West Bengal, India</li>
                <li>Phone: +91 9669664421</li>
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

export default TermsOfService;

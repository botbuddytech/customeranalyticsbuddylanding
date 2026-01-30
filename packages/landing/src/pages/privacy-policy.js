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

const PrivacyPolicy = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Privacy Policy - BotBuddy Customer Analytics | Data Protection & Privacy</title>
          <meta name="description" content="Privacy Policy for BotBuddy Customer Analytics. Learn how we collect, use, and protect your data. GDPR compliant with transparent data practices for Shopify store owners." />
          <meta name="keywords" content="BotBuddy privacy policy, data protection, GDPR compliance, Shopify app privacy, customer data security, analytics privacy" />
          <meta name="robots" content="index, follow" />
          
          {/* Structured Data for Privacy Policy */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Privacy Policy - BotBuddy Customer Analytics",
                "description": "Privacy Policy explaining how BotBuddy Customer Analytics collects, uses, and protects user data",
                "url": "https://botbuddy-analytics.com/privacy-policy",
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
              <Heading as="h1" content="Privacy Policy" />
              <Text content="Last updated: December 2024" />
              
              <Heading as="h2" content="1. Introduction" />
              <Text content="Welcome to BotBuddy Customer Analytics ('we,' 'our,' or 'us'). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Shopify app and related services (collectively, the 'Service'). Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service." />
              
              <Heading as="h2" content="2. Information We Collect" />
              <Heading as="h3" content="2.1 Information You Provide" />
              <Text content="We may collect information that you voluntarily provide to us when you register for an account, use our Service, or contact us for support. This may include:" />
              <ul>
                <li>Name and contact information</li>
                <li>Shopify store information</li>
                <li>Account credentials</li>
                <li>Communication preferences</li>
              </ul>
              
              <Heading as="h3" content="2.2 Information We Collect Automatically" />
              <Text content="When you use our Service, we may automatically collect certain information, including:" />
              <ul>
                <li>Shopify store data (customer information, order data, product data)</li>
                <li>Usage analytics and performance metrics</li>
                <li>Device information and IP addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
              
              <Heading as="h2" content="3. How We Use Your Information" />
              <Text content="We use the information we collect to:" />
              <ul>
                <li>Provide, operate, and maintain our Service</li>
                <li>Process and analyze your Shopify store data to generate insights</li>
                <li>Improve, personalize, and expand our Service</li>
                <li>Communicate with you about updates, support, and marketing</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <Heading as="h2" content="4. Data Sharing and Disclosure" />
              <Text content="We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:" />
              <ul>
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety, or that of our users</li>
                <li>With trusted service providers who assist us in operating our Service (under strict confidentiality agreements)</li>
                <li>In connection with a business transfer, merger, or acquisition</li>
              </ul>
              
              <Heading as="h2" content="5. Data Security" />
              <Text content="We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:" />
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
              
              <Heading as="h2" content="6. Data Retention" />
              <Text content="We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When you uninstall our app, we will delete your data within 30 days, unless we are required to retain it for legal or regulatory purposes." />
              
              <Heading as="h2" content="7. Your Rights" />
              <Text content="Depending on your location, you may have certain rights regarding your personal information, including:" />
              <ul>
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <Text content="To exercise these rights, please contact us at botbuddyteam@gmail.com." />
              
              <Heading as="h2" content="8. Cookies and Tracking Technologies" />
              <Text content="We use cookies and similar tracking technologies to enhance your experience with our Service. You can control cookie settings through your browser preferences, but disabling cookies may affect the functionality of our Service." />
              
              <Heading as="h2" content="9. Third-Party Services" />
              <Text content="Our Service integrates with Shopify and other third-party services. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these third parties." />
              
              <Heading as="h2" content="10. International Data Transfers" />
              <Text content="Your information may be transferred to and processed in countries other than your own. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information." />
              
              <Heading as="h2" content="11. Children's Privacy" />
              <Text content="Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us." />
              
              <Heading as="h2" content="12. Changes to This Privacy Policy" />
              <Text content="We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date. You are advised to review this Privacy Policy periodically for any changes." />
              
              <Heading as="h2" content="13. Contact Us" />
              <Text content="If you have any questions about this Privacy Policy or our privacy practices, please contact us:" />
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

export default PrivacyPolicy;

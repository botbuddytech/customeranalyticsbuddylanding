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

const ShippingPolicy = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Shipping Policy - BotBuddy Customer Analytics | Digital Service Delivery</title>
          <meta name="description" content="Shipping Policy for BotBuddy Customer Analytics. Learn about our digital service delivery, instant access, and SaaS service terms for Shopify analytics platform." />
          <meta name="keywords" content="BotBuddy shipping policy, digital service delivery, SaaS shipping, instant access, Shopify app delivery, analytics platform access" />
          <meta name="robots" content="index, follow" />
          
          {/* Structured Data for Shipping Policy */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Shipping Policy - BotBuddy Customer Analytics",
                "description": "Shipping Policy explaining digital service delivery for BotBuddy Customer Analytics SaaS platform",
                "url": "https://botbuddy-analytics.com/shipping-policy",
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
                <Heading as="h1" content="Shipping Policy" />
                <Text content="Last updated: December 2024" />

                <Heading as="h2" content="1. Digital Service Delivery" />
                <Text content="BotBuddy Customer Analytics is a Software-as-a-Service (SaaS) platform that provides digital analytics and customer segmentation tools for Shopify stores. Since we deliver digital services, there are no physical products to ship." />

                <Heading as="h2" content="2. Instant Access & Delivery" />
                <Text content="Upon successful subscription and payment processing, you will receive:" />
                <ul>
                  <li><strong>Immediate Access:</strong> Your BotBuddy Customer Analytics account will be activated instantly upon payment confirmation.</li>
                  <li><strong>Email Confirmation:</strong> You will receive a welcome email with login credentials and setup instructions within minutes of subscription.</li>
                  <li><strong>Dashboard Access:</strong> You can immediately access your analytics dashboard and begin using all features of the service.</li>
                  <li><strong>API Integration:</strong> The service integrates directly with your Shopify store through secure API connections.</li>
                </ul>

                <Heading as="h2" content="3. Service Availability" />
                <Text content="Our digital services are available 24/7, 365 days a year. There are no shipping delays or delivery times as the service is delivered instantly through the cloud." />

                <Heading as="h2" content="4. Geographic Availability" />
                <Text content="BotBuddy Customer Analytics is available worldwide. Since we provide digital services, there are no geographic restrictions or shipping limitations. The service is accessible from any location with internet connectivity." />

                <Heading as="h2" content="5. Service Setup & Onboarding" />
                <Text content="After subscription, you will receive:" />
                <ul>
                  <li><strong>Setup Guide:</strong> Step-by-step instructions to integrate BotBuddy with your Shopify store</li>
                  <li><strong>Account Configuration:</strong> Assistance with initial setup and customization</li>
                  <li><strong>Training Resources:</strong> Access to documentation, tutorials, and best practices</li>
                  <li><strong>Support Access:</strong> Direct access to our support team for any questions or assistance</li>
                </ul>

                <Heading as="h2" content="6. Service Updates & Maintenance" />
                <Text content="As a SaaS platform, BotBuddy Customer Analytics receives regular updates and improvements:" />
                <ul>
                  <li><strong>Automatic Updates:</strong> New features and improvements are delivered automatically</li>
                  <li><strong>Zero Downtime:</strong> Updates are deployed without service interruption</li>
                  <li><strong>Feature Announcements:</strong> You'll be notified of new features and capabilities</li>
                  <li><strong>Performance Improvements:</strong> Continuous optimization for better performance</li>
                </ul>

                <Heading as="h2" content="7. Data Security & Backup" />
                <Text content="Your data is securely stored and backed up:" />
                <ul>
                  <li><strong>Cloud Storage:</strong> All data is stored in secure, encrypted cloud servers</li>
                  <li><strong>Regular Backups:</strong> Your analytics data is automatically backed up daily</li>
                  <li><strong>Data Recovery:</strong> In case of any issues, your data can be restored from backups</li>
                  <li><strong>Security Compliance:</strong> We follow industry-standard security practices and compliance requirements</li>
                </ul>

                <Heading as="h2" content="8. Service Cancellation & Data Export" />
                <Text content="If you decide to cancel your subscription:" />
                <ul>
                  <li><strong>Data Export:</strong> You can export your analytics data before cancellation</li>
                  <li><strong>Grace Period:</strong> Your data remains accessible for 30 days after cancellation</li>
                  <li><strong>No Physical Returns:</strong> Since this is a digital service, there are no physical products to return</li>
                  <li><strong>Account Deactivation:</strong> Your account will be deactivated at the end of your billing period</li>
                </ul>

                <Heading as="h2" content="9. Technical Requirements" />
                <Text content="To use BotBuddy Customer Analytics, you need:" />
                <ul>
                  <li><strong>Internet Connection:</strong> Stable internet connection for real-time analytics</li>
                  <li><strong>Modern Browser:</strong> Updated web browser (Chrome, Firefox, Safari, Edge)</li>
                  <li><strong>Shopify Store:</strong> Active Shopify store with admin access</li>
                  <li><strong>API Permissions:</strong> Ability to install Shopify apps and grant necessary permissions</li>
                </ul>

                <Heading as="h2" content="10. Support & Assistance" />
                <Text content="If you need help with service delivery or setup:" />
                <ul>
                  <li><strong>Email Support:</strong> Contact us at botbuddyteam@gmail.com</li>
                  <li><strong>Phone Support:</strong> Call us at +91 9669664421</li>
                  <li><strong>Documentation:</strong> Access our comprehensive help center and guides</li>
                  <li><strong>Live Chat:</strong> Available during business hours for immediate assistance</li>
                </ul>

                <Heading as="h2" content="11. Changes to This Policy" />
                <Text content="We may update this Shipping Policy from time to time to reflect changes in our service delivery methods or legal requirements. We will notify you of any significant changes via email or through our service dashboard." />

                <Heading as="h2" content="12. Contact Information" />
                <Text content="If you have any questions about our digital service delivery or this Shipping Policy, please contact us:" />
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

export default ShippingPolicy;

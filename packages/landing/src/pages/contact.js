import React, { Fragment } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Sticky from 'react-stickynode';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { theme } from 'common/theme/webAppCreative';
import ResetCSS from 'common/assets/css/style';
import Navbar from 'containers/WebAppCreative/Navbar';
import Contact from 'containers/WebAppCreative/Contact';
import Footer from 'containers/WebAppCreative/Footer';
import { GlobalStyle, ContentWrapper } from 'containers/WebAppCreative/webAppCreative.style';
import 'animate.css';

const ContactPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Contact Us - BotBuddy Customer Analytics | Get Support & Help</title>
          <meta name="description" content="Contact BotBuddy Customer Analytics team for support, questions, or partnership inquiries. Get help with Shopify analytics, customer segmentation, and AI insights. We respond within 24 hours." />
          <meta name="keywords" content="contact BotBuddy, Shopify analytics support, customer segmentation help, AI insights support, e-commerce analytics contact" />
          <meta name="theme-color" content="#95bf47" />
          
          {/* Structured Data for Contact Page */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "Contact BotBuddy Customer Analytics",
                "description": "Get in touch with our team for support and inquiries",
                "url": "https://botbuddy-analytics.com/contact",
                "mainEntity": {
                  "@type": "Organization",
                  "name": "BotBuddy Team",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+91-9669664421",
                    "contactType": "customer service",
                    "email": "botbuddyteam@gmail.com",
                    "availableLanguage": "English"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "West Bengal",
                    "addressCountry": "India"
                  }
                }
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
        <style jsx global>{`
          @media (max-width: 768px) {
            #contact .contact-form-grid {
              grid-template-columns: 1fr !important;
            }
            #contact .contact-header h1 {
              font-size: 32px !important;
            }
            #contact .contact-info-card {
              padding: 30px 20px !important;
              margin-bottom: 20px !important;
            }
            #contact .contact-form-card {
              padding: 30px 20px !important;
            }
          }
          @media (max-width: 480px) {
            #contact .contact-header h1 {
              font-size: 28px !important;
            }
            #contact .contact-header p {
              font-size: 16px !important;
            }
          }
        `}</style>

        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          <Contact />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default ContactPage;

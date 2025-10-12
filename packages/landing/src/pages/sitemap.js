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
import Link from 'common/components/Link';
import { Section, ContentSection, SitemapGrid, SitemapSection, SitemapList, SitemapItem } from '../containers/WebAppCreative/PrivacyPolicy/privacy-policy.style';

const Sitemap = () => {
  const sitemapData = {
    mainPages: [
      { title: 'Home', url: '/', description: 'Main landing page with product overview' },
      { title: 'Contact Us', url: '/contact', description: 'Get in touch with our team' },
      { title: 'Privacy Policy', url: '/privacy-policy', description: 'How we protect your data and privacy' },
      { title: 'Terms of Service', url: '/terms-of-service', description: 'Terms and conditions for using our service' },
      { title: 'Shipping Policy', url: '/shipping-policy', description: 'Digital service delivery and instant access information' },
      { title: 'Cancellation & Refunds', url: '/cancellation-refunds', description: 'Flexible cancellation and refund policy - cancel anytime, no questions asked' },
    ],
    productSections: [
      { title: 'Features', url: '/#features', description: 'Key features of BotBuddy Customer Analytics' },
      { title: 'How It Works', url: '/#how-it-works', description: 'Step-by-step guide to using our platform' },
      { title: 'Dashboard', url: '/#dashboard', description: 'Analytics dashboard and insights' },
      { title: 'Testimonials', url: '/#testimonial', description: 'What our customers say about us' },
      { title: 'Pricing', url: '/#pricing', description: 'Choose the plan that fits your needs' },
      { title: 'FAQ', url: '/#faq', description: 'Frequently asked questions' },
    ],
    resources: [
      { title: 'Blog', url: '/#blog', description: 'Latest insights and updates' },
      { title: 'Documentation', url: '/#docs', description: 'Help and support resources' },
      { title: 'API Reference', url: '/#api', description: 'Technical documentation for developers' },
      { title: 'Support Center', url: '/#support', description: 'Get help and support' },
    ],
    legal: [
      { title: 'Privacy Policy', url: '/privacy-policy', description: 'Data protection and privacy information' },
      { title: 'Terms of Service', url: '/terms-of-service', description: 'Terms and conditions' },
      { title: 'Cookie Policy', url: '/#cookies', description: 'How we use cookies' },
      { title: 'GDPR Compliance', url: '/#gdpr', description: 'GDPR compliance information' },
    ]
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Sitemap - BotBuddy Customer Analytics | Website Navigation & Structure</title>
          <meta name="description" content="Complete sitemap for BotBuddy Customer Analytics website. Find all pages, sections, and navigate to features, pricing, contact, and legal pages easily." />
          <meta name="keywords" content="BotBuddy sitemap, website navigation, Shopify analytics pages, customer segmentation site map" />
          <meta name="robots" content="index, follow" />
          
          {/* Structured Data for Sitemap */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Sitemap - BotBuddy Customer Analytics",
                "description": "Complete sitemap and navigation guide for BotBuddy Customer Analytics website",
                "url": "https://botbuddy-analytics.com/sitemap",
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
                <Heading as="h1" content="Sitemap" />
                <Text content="Find all pages and sections of our website organized by category." />
                
                <SitemapGrid>
                  <SitemapSection>
                    <Heading as="h2" content="Main Pages" />
                    <SitemapList>
                      {sitemapData.mainPages.map((page, index) => (
                        <SitemapItem key={index}>
                          <Link href={page.url}>
                            <strong>{page.title}</strong>
                          </Link>
                          <Text content={page.description} />
                        </SitemapItem>
                      ))}
                    </SitemapList>
                  </SitemapSection>

                  <SitemapSection>
                    <Heading as="h2" content="Product Sections" />
                    <SitemapList>
                      {sitemapData.productSections.map((section, index) => (
                        <SitemapItem key={index}>
                          <Link href={section.url}>
                            <strong>{section.title}</strong>
                          </Link>
                          <Text content={section.description} />
                        </SitemapItem>
                      ))}
                    </SitemapList>
                  </SitemapSection>

                  <SitemapSection>
                    <Heading as="h2" content="Resources" />
                    <SitemapList>
                      {sitemapData.resources.map((resource, index) => (
                        <SitemapItem key={index}>
                          <Link href={resource.url}>
                            <strong>{resource.title}</strong>
                          </Link>
                          <Text content={resource.description} />
                        </SitemapItem>
                      ))}
                    </SitemapList>
                  </SitemapSection>

                  <SitemapSection>
                    <Heading as="h2" content="Legal & Compliance" />
                    <SitemapList>
                      {sitemapData.legal.map((legal, index) => (
                        <SitemapItem key={index}>
                          <Link href={legal.url}>
                            <strong>{legal.title}</strong>
                          </Link>
                          <Text content={legal.description} />
                        </SitemapItem>
                      ))}
                    </SitemapList>
                  </SitemapSection>
                </SitemapGrid>

                <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                  <Heading as="h2" content="About This Sitemap" />
                  <Text content="This sitemap provides a comprehensive overview of all pages and sections available on the BotBuddy Customer Analytics website. Use this page to quickly navigate to any section of our site or to understand the structure of our content." />
                  <Text content="If you can't find what you're looking for, please contact us through our Contact page or reach out to our support team." />
                </div>
              </ContentSection>
            </Container>
          </Section>
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default Sitemap;

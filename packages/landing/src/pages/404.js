import React, { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ThemeProvider } from 'styled-components';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import { theme } from 'common/theme/webAppCreative';
import ResetCSS from 'common/assets/css/style';
import { GlobalStyle } from 'containers/WebAppCreative/webAppCreative.style';
import Navbar from 'containers/WebAppCreative/Navbar';
import Footer from 'containers/WebAppCreative/Footer';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Button from 'common/components/Button';
import { ContentWrapper } from 'containers/WebAppCreative/webAppCreative.style';
import { Section } from 'containers/WebAppCreative/PrivacyPolicy/privacy-policy.style';

const Custom404 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>404 - Page Not Found | BotBuddy Customer Analytics</title>
          <meta name="description" content="The page you're looking for doesn't exist. Return to BotBuddy Customer Analytics homepage to explore our Shopify analytics and customer segmentation features." />
          <meta name="robots" content="noindex, follow" />
          
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
          <DrawerProvider>
            <Navbar />
          </DrawerProvider>
          
          <Section style={{ 
            padding: '100px 0', 
            textAlign: 'center',
            backgroundColor: '#ffffff',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Container width="1400px">
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Heading 
                  as="h1" 
                  content="404 - Page Not Found" 
                  style={{
                    fontSize: '72px',
                    fontWeight: '700',
                    color: '#95bf47',
                    marginBottom: '20px',
                    lineHeight: '1.1'
                  }}
                />
                
                <Heading 
                  as="h2" 
                  content="Oops! This page doesn't exist" 
                  style={{
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#0f2137',
                    marginBottom: '20px'
                  }}
                />
                
                <Text 
                  content="The page you're looking for might have been moved, deleted, or doesn't exist. Let's get you back on track with BotBuddy Customer Analytics."
                  style={{
                    fontSize: '18px',
                    color: '#5a6c7d',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                  }}
                />
                
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/">
                    <Button
                      title="Go Home"
                      colors="primaryWithBg"
                      style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    />
                  </Link>
                  
                  <Link href="/contact">
                    <Button
                      title="Contact Support"
                      colors="primaryWithBg"
                      style={{
                        padding: '15px 30px',
                        fontSize: '16px',
                        fontWeight: '600',
                        backgroundColor: '#e8ecf0',
                        color: '#0f2137'
                      }}
                    />
                  </Link>
                </div>
                
                <div style={{ 
                  marginTop: '60px', 
                  padding: '30px', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '10px',
                  textAlign: 'left'
                }}>
                  <Heading 
                    as="h3" 
                    content="Popular Pages" 
                    style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#0f2137',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}
                  />
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '15px' 
                  }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                      <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#ffffff', 
                        borderRadius: '8px',
                        border: '1px solid #e8ecf0',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}>
                        <Text content="🏠 Home" style={{ margin: 0, fontWeight: '600', color: '#0f2137' }} />
                      </div>
                    </Link>
                    
                    <Link href="/contact" style={{ textDecoration: 'none' }}>
                      <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#ffffff', 
                        borderRadius: '8px',
                        border: '1px solid #e8ecf0',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}>
                        <Text content="📞 Contact" style={{ margin: 0, fontWeight: '600', color: '#0f2137' }} />
                      </div>
                    </Link>
                    
                    <Link href="/privacy-policy" style={{ textDecoration: 'none' }}>
                      <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#ffffff', 
                        borderRadius: '8px',
                        border: '1px solid #e8ecf0',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}>
                        <Text content="🔒 Privacy Policy" style={{ margin: 0, fontWeight: '600', color: '#0f2137' }} />
                      </div>
                    </Link>
                    
                    <Link href="/sitemap" style={{ textDecoration: 'none' }}>
                      <div style={{ 
                        padding: '15px', 
                        backgroundColor: '#ffffff', 
                        borderRadius: '8px',
                        border: '1px solid #e8ecf0',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}>
                        <Text content="🗺️ Sitemap" style={{ margin: 0, fontWeight: '600', color: '#0f2137' }} />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
          
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default Custom404;

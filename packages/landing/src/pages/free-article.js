import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import Navbar from "containers/WebAppCreative/Navbar";
import FreeArticle from "containers/WebAppCreative/FreeArticle";
import Footer from "containers/WebAppCreative/Footer";
import {
  GlobalStyle,
  ContentWrapper,
} from "containers/WebAppCreative/webAppCreative.style";
import "animate.css";

const FreeArticlePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>
            Get Free Article - BotBuddy Customer Analytics | Shopify Insights
          </title>
          <meta
            name="description"
            content="Get a free customer analytics article from BotBuddy. Share your email to receive insights on understanding your Shopify customers and boosting sales."
          />
          <meta
            name="keywords"
            content="free article, Shopify analytics guide, customer analytics article, BotBuddy free resource"
          />
          <meta name="theme-color" content="#95bf47" />

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
            #free_article .contact-form-card {
              padding: 30px 20px !important;
            }
            #free_article .contact-header h1 {
              font-size: 32px !important;
            }
          }
          @media (max-width: 480px) {
            #free_article .contact-header h1 {
              font-size: 28px !important;
            }
            #free_article .contact-header p {
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
          <FreeArticle />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export default FreeArticlePage;



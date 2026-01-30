import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import Banner from "containers/WebAppCreative/Banner";
import Navbar from "containers/WebAppCreative/Navbar";
import Clients from "containers/WebAppCreative/Clients";
import HowItWorks from "containers/WebAppCreative/HowItWorks";
import AnalyticsTool from "containers/WebAppCreative/AnalyticsTool";
import IntroVideo from "containers/WebAppCreative/IntroVideo";
import AnalyticsTools2 from "containers/WebAppCreative/AnalyticsTools2";
import Dashboard from "containers/WebAppCreative/Dashboard";
import Testimonials from "containers/WebAppCreative/Testimonials";
import Integrations from "containers/WebAppCreative/Integrations";
import Pricing from "containers/WebAppCreative/Pricing";
import Blog from "containers/WebAppCreative/Blog";
import Faq from "containers/WebAppCreative/Faq";
import CallToAction from "containers/WebAppCreative/CallToAction";
import Footer from "containers/WebAppCreative/Footer";
import {
  GlobalStyle,
  ContentWrapper,
  CombinedSection,
  CornerPattern,
} from "containers/WebAppCreative/webAppCreative.style";
import "animate.css";

const webAppCreative = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>
            BotBuddy Customer Analytics - AI-Powered Shopify Analytics &
            Customer Segmentation
          </title>
          <meta
            name="description"
            content="Transform your Shopify store with BotBuddy Customer Analytics. Get AI-powered insights, customer segmentation, and automated marketing campaigns to boost sales and retention. Free trial available."
          />
          <meta
            name="keywords"
            content="Shopify analytics, customer segmentation, AI insights, e-commerce analytics, customer retention, marketing automation, Shopify app, customer behavior analysis"
          />
          <meta name="theme-color" content="#95bf47" />

          {/* Structured Data for Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "BotBuddy Customer Analytics",
                description:
                  "AI-powered Shopify analytics and customer segmentation platform",
                url: "https://botbuddy-analytics.com",
                applicationCategory: "BusinessApplication",
                operatingSystem: "Web",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  description: "Free trial available",
                },
                provider: {
                  "@type": "Organization",
                  name: "BotBuddy Team",
                  url: "https://botbuddy-analytics.com",
                  contactPoint: {
                    "@type": "ContactPoint",
                    email: "botbuddyteam@gmail.com",
                    telephone: "+91-9669664421",
                  },
                },
              }),
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
          <Banner />
          {/* <IntroVideo /> */}
          <Dashboard />
          
          {/* <Clients />
		  <HowItWorks /> */}
          <AnalyticsTool />
          <AnalyticsTools2 />
          {/* <Testimonials /> */}
          <Faq />
          <CombinedSection>
            {/* <Integrations /> */}
            <Pricing />
            <CornerPattern />
          </CombinedSection>
          <Blog />

          <CallToAction />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default webAppCreative;

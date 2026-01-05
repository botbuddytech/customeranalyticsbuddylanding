import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import Navbar from "containers/WebAppCreative/Navbar";
import Documentation from "containers/WebAppCreative/Documentation";
import Footer from "containers/WebAppCreative/Footer";
import {
  GlobalStyle,
  ContentWrapper,
} from "containers/WebAppCreative/webAppCreative.style";

export default function DocumentationPage() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Documentation - Customer Analytics Buddy</title>
          <meta
            name="description"
            content="Complete documentation for Customer Analytics Buddy. Learn how to install, configure, and use our Shopify analytics platform."
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
          <Documentation />
          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
}

// Explicitly tell Next.js this is not a static page
export async function getServerSideProps() {
  return {
    props: {},
  };
}

import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import Documentation from "containers/WebAppCreative/Documentation";
import { GlobalStyle } from "containers/WebAppCreative/webAppCreative.style";

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
        <Documentation />
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

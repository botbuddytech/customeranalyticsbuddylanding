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
import LoginContainer from 'containers/WebAppCreative/Login';
import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";

const LoginPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Login - BotBuddy Customer Analytics | Shopify Analytics Platform</title>
          <meta name="description" content="Login to your BotBuddy Customer Analytics dashboard. Manage your Shopify store analytics, customer segmentation, and marketing campaigns." />
          <meta name="keywords" content="BotBuddy login, customer analytics login, Shopify analytics dashboard, merchant login" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        
        <ResetCSS />
        <GlobalStyle />

        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>

          <LoginContainer />

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (session) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error("Login page session check failed:", error);
  }

  return {
    props: {},
  };
}

export default LoginPage;

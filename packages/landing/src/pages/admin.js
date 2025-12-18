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
import AdminContainer from 'containers/WebAppCreative/Admin';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';

const AdminPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Admin - BotBuddy Customer Analytics | Shopify Analytics Platform</title>
          <meta name="description" content="Admin dashboard for BotBuddy Customer Analytics." />
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

          <AdminContainer />

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error('Admin page session check failed:', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default AdminPage;

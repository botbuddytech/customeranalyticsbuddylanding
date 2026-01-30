import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import {
  GlobalStyle,
  ContentWrapper,
} from "containers/WebAppCreative/webAppCreative.style";
import Navbar from "containers/WebAppCreative/Navbar";
import Footer from "containers/WebAppCreative/Footer";
import AdminLayout from "components/admin/AdminLayout";
import DocumentationData from "components/admin/DocumentationData";
import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";

const AdminDocumentationPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Admin - Documentation | BotBuddy Customer Analytics</title>
          <meta
            name="description"
            content="Manage documentation articles for BotBuddy Customer Analytics."
          />
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

          <AdminLayout>
            <div>
              <DocumentationData />
            </div>
          </AdminLayout>

          <Footer />
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};

export async function getServerSideProps(context) {
  try {
    const session = await getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.error("Admin Documentation page session check failed:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default AdminDocumentationPage;

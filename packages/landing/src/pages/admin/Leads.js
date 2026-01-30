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
import Heading from "common/components/Heading";
import Text from "common/components/Text";
import LeadsData from "components/admin/LeadsData";
import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";

const AdminLeadsPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Admin - Leads | BotBuddy Customer Analytics</title>
          <meta
            name="description"
            content="View and manage leads collected from your BotBuddy Customer Analytics landing pages."
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
              <Heading content="Leads Overview" />
              <Text
                className="description"
                content="Review all the emails collected from your landing pages and export them for campaigns."
              />
              <LeadsData />
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
    console.error("Admin Leads page session check failed:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default AdminLeadsPage;

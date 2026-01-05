import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import { GlobalStyle } from "containers/WebAppCreative/webAppCreative.style";
import BlogEditor from "components/admin/BlogEditor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";

const EditBlogPage = ({ id }) => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Edit Blog Content | BotBuddy Customer Analytics</title>
          <meta
            name="description"
            content="Edit blog content with Markdown editor"
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <ResetCSS />
        <GlobalStyle />

        <BlogEditor blogId={id} />
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
      props: {
        id: context.params.id,
      },
    };
  } catch (error) {
    console.error("Admin edit blog page session check failed:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default EditBlogPage;


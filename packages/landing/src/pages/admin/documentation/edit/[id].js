import React, { Fragment } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme } from "common/theme/webAppCreative";
import ResetCSS from "common/assets/css/style";
import { GlobalStyle } from "containers/WebAppCreative/webAppCreative.style";
import DocumentationEditor from "components/admin/DocumentationEditor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";

const EditDocumentationPage = ({ id }) => {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <title>Edit Documentation Content | BotBuddy Customer Analytics</title>
          <meta
            name="description"
            content="Edit documentation content with Markdown editor"
          />
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <ResetCSS />
        <GlobalStyle />

        <DocumentationEditor docId={id} />
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

    const { id } = context.params;

    return {
      props: {
        id: parseInt(id),
      },
    };
  } catch (error) {
    console.error("Edit Documentation page session check failed:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default EditDocumentationPage;

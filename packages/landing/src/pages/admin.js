import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "lib/auth";

// This page only redirects /admin to /admin/Leads after auth check.
const AdminRedirectPage = () => null;

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
      redirect: {
        destination: "/admin/Leads",
        permanent: false,
      },
    };
  } catch (error) {
    console.error("Admin page session check failed:", error);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

export default AdminRedirectPage;

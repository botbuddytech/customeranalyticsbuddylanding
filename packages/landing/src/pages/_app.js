import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import "common/assets/css/react-slick.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://botbuddy-analytics.com";
  const path = router?.asPath || "/";
  const canonicalUrl = siteUrl
    ? `${siteUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
    : undefined;

  // Default SEO data
  const defaultSEO = {
    title:
      "BotBuddy Customer Analytics - AI-Powered Shopify Analytics & Segmentation",
    description:
      "Transform your Shopify store with BotBuddy Customer Analytics. Get AI-powered insights, customer segmentation, and automated marketing campaigns to boost sales and retention.",
    keywords:
      "Shopify analytics, customer segmentation, AI insights, e-commerce analytics, customer retention, marketing automation, Shopify app",
    image: `${siteUrl}/fav.png`,
    siteName: "BotBuddy Customer Analytics",
  };

  return (
    <SessionProvider session={session}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Default SEO Meta Tags */}
        <title>{defaultSEO.title}</title>
        <meta name="description" content={defaultSEO.description} />
        <meta name="keywords" content={defaultSEO.keywords} />
        <meta name="author" content="BotBuddy Team" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#95bf47" />
        <meta name="msapplication-TileColor" content="#95bf47" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={defaultSEO.siteName} />
        <meta property="og:title" content={defaultSEO.title} />
        <meta property="og:description" content={defaultSEO.description} />
        <meta property="og:image" content={defaultSEO.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="BotBuddy Customer Analytics Dashboard"
        />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@botbuddy_analytics" />
        <meta name="twitter:creator" content="@botbuddy_analytics" />
        <meta name="twitter:title" content={defaultSEO.title} />
        <meta name="twitter:description" content={defaultSEO.description} />
        <meta name="twitter:image" content={defaultSEO.image} />
        <meta
          name="twitter:image:alt"
          content="BotBuddy Customer Analytics Dashboard"
        />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="BotBuddy Customer Analytics" />
        <meta name="apple-mobile-web-app-title" content="BotBuddy Analytics" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

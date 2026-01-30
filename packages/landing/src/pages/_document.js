import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { createStylesServer, ServerStyles } from "@mantine/next";

const stylesServer = createStylesServer();

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    // Styled components style SSR extraction
    const sheet = new ServerStyleSheet();

    try {
      const originalRenderPage = ctx.renderPage;
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) =>
            (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="application-name" content="BotBuddy Customer Analytics" />
          <meta name="apple-mobile-web-app-title" content="BotBuddy Analytics" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link rel="mask-icon" href="/favicon.png" color="#95bf47" />
          <meta name="msapplication-TileColor" content="#95bf47" />
          <meta name="theme-color" content="#95bf47" />
          
          {/* Load google fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope:wght@400;500;700;800&display=swap"
          />

          {/* Next and Styled components SSR styles */}
          {this.props.styles}
          {/* Mantine SSR styles */}
          <ServerStyles html={this.props.html} server={stylesServer} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

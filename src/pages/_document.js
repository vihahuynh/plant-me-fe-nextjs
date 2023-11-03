import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="overlay-root"></div>
        <div id="alert-root"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

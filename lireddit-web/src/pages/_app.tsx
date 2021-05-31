import Head from "next/head";
import "../styles/add-to-calendar-button.css";
import "../styles/banner-button.css";
import "../styles/electron-header.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
        <link rel="apple-touch-icon" href="/img/mentes.png"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

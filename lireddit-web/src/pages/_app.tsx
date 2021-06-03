import Head from "next/head";
import "../styles/add-to-calendar-button.css";
import "../styles/banner-button.css";
import "../styles/electron-header.css";
import "../styles/globals.css";
import ReactModal from "react-modal";

import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import { isServer } from "../utils/isServer";

if (!isServer) {
}
Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
ReactModal.setAppElement("#__next");

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

// import theme from "../theme";
import Head from "next/head";

import "../styles/globals.css";
import "../styles/add-to-calendar-button.css";

import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

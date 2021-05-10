import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Head from "next/head";
import { PaginatedPosts } from "../generated/graphql";
import "../styles/add-to-calendar-button.css";
import "../styles/banner-button.css";
import "../styles/electron-header.css";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: [],
            merge(
              existing: PaginatedPosts | undefined,
              incoming: PaginatedPosts
            ): PaginatedPosts {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <ApolloProvider client={client}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
          />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;

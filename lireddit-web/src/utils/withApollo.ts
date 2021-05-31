import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedPosts, PaginatedPartner } from "../generated/graphql";
import { NextPageContext } from "next";
import { createUploadLink } from "apollo-upload-client";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    link: createUploadLink({
      uri: process.env.NEXT_PUBLIC_API_URL,
      credentials: "include",
    }),
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
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
            partners: {
              keyArgs: [],
              merge(
                existing: PaginatedPartner | undefined,
                incoming: PaginatedPartner
              ): PaginatedPartner {
                return {
                  ...incoming,
                  people: [...(existing?.people || []), ...incoming.people],
                };
              },
            },
          },
        },
      },
    }),
  });

export const withApollo = createWithApollo(createClient);

import { createWithApollo } from "./createWithApollo";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PaginatedPosts, PaginatedPartner } from "../generated/graphql";
import { NextPageContext } from "next";

const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:5000/graphql",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
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

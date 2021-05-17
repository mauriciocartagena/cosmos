import { stringifyVariables } from "@urql/core";
import { Cache, cacheExchange, Resolver } from "@urql/exchange-graphcache";
import router from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import {
  CreateUserMutation,
  DeletePartnerMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  UpdatedPartnerMutationVariables,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { UpdateUserMutationVariables, User } from "../generated/graphql";

console.log(Cache);

const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          router.replace("/login");
        }
      })
    );
  };

export type MergeMode = "before" | "after";

export interface PaginationParams {
  offsetArgument?: string;
  limitArgument?: string;
  mergeMode?: MergeMode;
}

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};
const cursorPaginationPartner = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    const allFields = cache.inspectFields(entityKey);

    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)}`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "people"
    );
    info.partial = !isItInTheCache;

    let hasMore = true;

    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "people") as string[];
      const _hasMore = cache.resolve(key, "hasMore");

      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }

      results.push(...data);
    });

    return {
      __typename: "PaginatedPartner",
      hasMore,
      people: results,
    };
  };
};

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PaginatedPosts: () => null,
        PaginatedPartner: () => null,
      },
      resolvers: {
        Query: {
          posts: cursorPagination(),
          partners: cursorPaginationPartner(),
        },
      },
      updates: {
        Mutation: {
          deletePartner: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "People",
              id: (args as DeletePartnerMutationVariables).id,
            });
          },
          createPost: (_result, args, cache, info) => {
            invalidateAllPosts(cache);
          },
          createPartner: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "partners"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "partners", fi.arguments || {});
            });
          },
          updatedPartner: (_result, args, cache, info) => {
            cache.invalidate({
              __typename: "People",
              id: (args as UpdatedPartnerMutationVariables).id,
            });
          },
          updatedAccount: (_result, args, cache, info) => {
            const allFields = cache.inspectFields("Query");
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === "User" || "People"
            );
            fieldInfos.forEach((fi) => {
              cache.invalidate("Query", "user", fi.arguments || {}),
                cache.invalidate("Query", "People", fi.arguments || {});
            });
          },

          // updatedPost: (_result, args, cache, info) => {
          //   cache.invalidate({
          //     __typename: "Post",
          //     id: (args as UpdatePostMutationVariables).id,
          //   });
          // },

          CreateUser: (_result, args, cache, info) => {
            cache.invalidate("Query", "users", {
              limit: 5,
            });
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              () => ({ me: null, router: router.push("/") })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
            invalidateAllPosts(cache);
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<CreateUserMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result, query) => {
                if (result.createUser.errors) {
                  return query;
                } else {
                  return {
                    me: result.createUser.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});

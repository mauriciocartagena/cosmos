import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createUser: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
};

export type MutationCreateUserArgs = {
  options: DataUserInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  me?: Maybe<User>;
  users: Array<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
  first_last_name: Scalars["String"];
  second_last_name: Scalars["String"];
  phone: Scalars["Float"];
  direction: Scalars["String"];
  email: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type DataUserInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
  first_last_name: Scalars["String"];
  second_last_name: Scalars["String"];
  phone: Scalars["Float"];
  direction: Scalars["String"];
  email: Scalars["String"];
};

export type RegularUserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
    user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type CreateUserMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
  first_last_name: Scalars["String"];
  second_last_name: Scalars["String"];
  phone: Scalars["Float"];
  direction: Scalars["String"];
  email: Scalars["String"];
}>;

export type CreateUserMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "UserResponse" } & {
    errors?: Maybe<
      Array<
        { __typename?: "FieldError" } & Pick<FieldError, "field" | "message">
      >
    >;
    user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<
    { __typename?: "User" } & Pick<
      User,
      "id" | "createdAt" | "username" | "first_last_name" | "name"
    >
  >;
};

export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      errors {
        field
        message
      }
      user {
        ...RegularUser
      }
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const CreateUserDocument = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
    $name: String!
    $first_last_name: String!
    $second_last_name: String!
    $phone: Float!
    $direction: String!
    $email: String!
  ) {
    createUser(
      options: {
        username: $username
        password: $password
        name: $name
        first_last_name: $first_last_name
        second_last_name: $second_last_name
        phone: $phone
        direction: $direction
        email: $email
      }
    ) {
      errors {
        field
        message
      }
      user {
        ...RegularUser
      }
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(
    CreateUserDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const UsersDocument = gql`
  query Users {
    users {
      id
      createdAt
      username
      first_last_name
      name
    }
  }
`;

export function useUsersQuery(
  options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
}

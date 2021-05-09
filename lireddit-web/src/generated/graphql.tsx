import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldErrorParnet = {
  __typename?: 'FieldErrorParnet';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  fetchUser: User;
  createUser: UserResponse;
  updatedUser: User;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
  createPost: Post;
  createPartner: PartnerResponse;
  updatedPartner: PartnerResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationFetchUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateUserArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatedUserArgs = {
  email: Scalars['String'];
  direction: Scalars['String'];
  phone: Scalars['Int'];
  second_last_name: Scalars['String'];
  first_last_name: Scalars['String'];
  name: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  url: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreatePartnerArgs = {
  input: PartnerInput;
};


export type MutationUpdatedPartnerArgs = {
  input: PartnerInput;
};

export type PaginatedPartner = {
  __typename?: 'PaginatedPartner';
  people: Array<People>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type PartnerInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['Float'];
  direction: Scalars['String'];
};

export type PartnerResponse = {
  __typename?: 'PartnerResponse';
  errors?: Maybe<Array<FieldErrorParnet>>;
  people?: Maybe<People>;
};

export type People = {
  __typename?: 'People';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['Float'];
  direction: Scalars['String'];
  email: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  title: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  subtitle: Scalars['String'];
  type: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  title: Scalars['String'];
  subtitle: Scalars['String'];
  description: Scalars['String'];
  url: Scalars['String'];
  type: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  users: Array<User>;
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  parnets: PaginatedPartner;
  partner?: Maybe<People>;
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryParnetsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPartnerArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['Float'];
  direction: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['Float'];
  direction: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type RegularUserFindOneUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction' | 'email' | 'username'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePartnerMutationVariables = Exact<{
  input: PartnerInput;
}>;


export type CreatePartnerMutation = (
  { __typename?: 'Mutation' }
  & { createPartner: (
    { __typename?: 'PartnerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorParnet' }
      & Pick<FieldErrorParnet, 'field' | 'message'>
    )>>, people?: Maybe<(
      { __typename?: 'People' }
      & Pick<People, 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction' | 'email'>
    )> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'subtitle' | 'url' | 'type' | 'description' | 'creatorId'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateUserMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  url: Scalars['String'];
  description: Scalars['String'];
  type: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'url' | 'description' | 'type' | 'subtitle'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['Int'];
  direction: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updatedUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction' | 'email'>
  ) }
);

export type FetchUserMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type FetchUserMutation = (
  { __typename?: 'Mutation' }
  & { fetchUser: (
    { __typename?: 'User' }
    & RegularUserFindOneUserFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PartnerQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PartnerQuery = (
  { __typename?: 'Query' }
  & { partner?: Maybe<(
    { __typename?: 'People' }
    & Pick<People, 'direction' | 'phone' | 'name' | 'second_last_name' | 'first_last_name' | 'email'>
  )> }
);

export type ParnetsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ParnetsQuery = (
  { __typename?: 'Query' }
  & { parnets: (
    { __typename?: 'PaginatedPartner' }
    & Pick<PaginatedPartner, 'hasMore'>
    & { people: Array<(
      { __typename?: 'People' }
      & Pick<People, 'createdAt' | 'id' | 'second_last_name' | 'name' | 'email' | 'first_last_name' | 'phone' | 'direction'>
    )> }
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'subtitle' | 'description' | 'title' | 'url' | 'type' | 'createdAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ) }
  )> }
);

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'subtitle' | 'description' | 'title' | 'url' | 'createdAt'>
    )> }
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'first_last_name' | 'second_last_name' | 'email' | 'direction' | 'phone'>
  )> }
);

export const RegularUserFindOneUserFragmentDoc = gql`
    fragment RegularUserFindOneUser on User {
  name
  first_last_name
  second_last_name
  phone
  direction
  email
  username
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreatePartnerDocument = gql`
    mutation CreatePartner($input: PartnerInput!) {
  createPartner(input: $input) {
    errors {
      field
      message
    }
    people {
      name
      first_last_name
      second_last_name
      phone
      direction
      email
    }
  }
}
    `;

export function useCreatePartnerMutation() {
  return Urql.useMutation<CreatePartnerMutation, CreatePartnerMutationVariables>(CreatePartnerDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    title
    subtitle
    url
    type
    description
    creatorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($options: UsernamePasswordInput!) {
  createUser(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $url: String!, $description: String!, $type: String!, $subtitle: String!, $title: String!) {
  updatePost(
    id: $id
    url: $url
    description: $description
    type: $type
    subtitle: $subtitle
    title: $title
  ) {
    title
    url
    description
    type
    subtitle
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: Int!, $name: String!, $first_last_name: String!, $second_last_name: String!, $phone: Int!, $direction: String!, $email: String!) {
  updatedUser(
    id: $id
    name: $name
    first_last_name: $first_last_name
    second_last_name: $second_last_name
    phone: $phone
    direction: $direction
    email: $email
  ) {
    id
    name
    first_last_name
    second_last_name
    phone
    direction
    email
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const FetchUserDocument = gql`
    mutation FetchUser($id: String!) {
  fetchUser(id: $id) {
    ...RegularUserFindOneUser
  }
}
    ${RegularUserFindOneUserFragmentDoc}`;

export function useFetchUserMutation() {
  return Urql.useMutation<FetchUserMutation, FetchUserMutationVariables>(FetchUserDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PartnerDocument = gql`
    query Partner($id: Int!) {
  partner(id: $id) {
    direction
    phone
    name
    second_last_name
    first_last_name
    email
  }
}
    `;

export function usePartnerQuery(options: Omit<Urql.UseQueryArgs<PartnerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PartnerQuery>({ query: PartnerDocument, ...options });
};
export const ParnetsDocument = gql`
    query Parnets($limit: Int!, $cursor: String) {
  parnets(cursor: $cursor, limit: $limit) {
    hasMore
    people {
      createdAt
      id
      second_last_name
      name
      email
      first_last_name
      phone
      direction
    }
  }
}
    `;

export function useParnetsQuery(options: Omit<Urql.UseQueryArgs<ParnetsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ParnetsQuery>({ query: ParnetsDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    id
    subtitle
    description
    title
    url
    type
    createdAt
    creator {
      id
      username
    }
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    hasMore
    posts {
      id
      subtitle
      description
      title
      url
      createdAt
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    first_last_name
    second_last_name
    email
    direction
    phone
  }
}
    `;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};
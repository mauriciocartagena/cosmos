import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  createUser: UserResponse;
  updatedUser: People;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updatePost?: Maybe<Post>;
  createPost: Post;
  createPartner: PartnerResponse;
  updatedPartner: PartnerResponse;
  deletePartner: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationCreateUserArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatedUserArgs = {
  direction: Scalars['String'];
  phone: Scalars['String'];
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
  id: Scalars['Int'];
};


export type MutationDeletePartnerArgs = {
  id: Scalars['Int'];
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
  name: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['String'];
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
  phone: Scalars['String'];
  direction: Scalars['String'];
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
  fetchUser: User;
  me?: Maybe<User>;
  users: Array<User>;
  posts: PaginatedPosts;
  post?: Maybe<Post>;
  partners: PaginatedPartner;
  partner?: Maybe<People>;
};


export type QueryFetchUserArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPartnersArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPartnerArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  creator: People;
  createdAt: Scalars['String'];
  peopleId: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
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
  type: Scalars['String'];
  first_last_name: Scalars['String'];
  second_last_name: Scalars['String'];
  phone: Scalars['String'];
  direction: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'peopleId' | 'email'>
);

export type RegularUserFindOneUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'peopleId' | 'username' | 'email'>
  & { creator: (
    { __typename?: 'People' }
    & Pick<People, 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction'>
  ) }
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
      & Pick<People, 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction'>
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

export type DeletePartnerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePartnerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePartner'>
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

export type UpdatedPartnerMutationVariables = Exact<{
  id: Scalars['Int'];
  input: PartnerInput;
}>;


export type UpdatedPartnerMutation = (
  { __typename?: 'Mutation' }
  & { updatedPartner: (
    { __typename?: 'PartnerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldErrorParnet' }
      & Pick<FieldErrorParnet, 'field' | 'message'>
    )>>, people?: Maybe<(
      { __typename?: 'People' }
      & Pick<People, 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction'>
    )> }
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
  phone: Scalars['String'];
  direction: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updatedUser: (
    { __typename?: 'People' }
    & Pick<People, 'id' | 'name' | 'first_last_name' | 'second_last_name' | 'phone' | 'direction'>
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
    & Pick<People, 'id' | 'direction' | 'phone' | 'name' | 'second_last_name' | 'first_last_name'>
  )> }
);

export type PartnersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PartnersQuery = (
  { __typename?: 'Query' }
  & { partners: (
    { __typename?: 'PaginatedPartner' }
    & Pick<PaginatedPartner, 'hasMore'>
    & { people: Array<(
      { __typename?: 'People' }
      & Pick<People, 'createdAt' | 'id' | 'second_last_name' | 'name' | 'first_last_name' | 'phone' | 'direction'>
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
      & Pick<User, 'username' | 'peopleId'>
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

export type FetchUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FetchUserQuery = (
  { __typename?: 'Query' }
  & { fetchUser: (
    { __typename?: 'User' }
    & RegularUserFindOneUserFragment
  ) }
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'peopleId' | 'username' | 'email'>
  )> }
);

export const RegularUserFindOneUserFragmentDoc = gql`
    fragment RegularUserFindOneUser on User {
  peopleId
  username
  email
  creator {
    name
    first_last_name
    second_last_name
    phone
    direction
  }
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
  username
  peopleId
  email
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
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
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
    }
  }
}
    `;
export type CreatePartnerMutationFn = Apollo.MutationFunction<CreatePartnerMutation, CreatePartnerMutationVariables>;

/**
 * __useCreatePartnerMutation__
 *
 * To run a mutation, you first call `useCreatePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerMutation, { data, loading, error }] = useCreatePartnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerMutation, CreatePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartnerMutation, CreatePartnerMutationVariables>(CreatePartnerDocument, options);
      }
export type CreatePartnerMutationHookResult = ReturnType<typeof useCreatePartnerMutation>;
export type CreatePartnerMutationResult = Apollo.MutationResult<CreatePartnerMutation>;
export type CreatePartnerMutationOptions = Apollo.BaseMutationOptions<CreatePartnerMutation, CreatePartnerMutationVariables>;
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
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePartnerDocument = gql`
    mutation DeletePartner($id: Int!) {
  deletePartner(id: $id)
}
    `;
export type DeletePartnerMutationFn = Apollo.MutationFunction<DeletePartnerMutation, DeletePartnerMutationVariables>;

/**
 * __useDeletePartnerMutation__
 *
 * To run a mutation, you first call `useDeletePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePartnerMutation, { data, loading, error }] = useDeletePartnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePartnerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePartnerMutation, DeletePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePartnerMutation, DeletePartnerMutationVariables>(DeletePartnerDocument, options);
      }
export type DeletePartnerMutationHookResult = ReturnType<typeof useDeletePartnerMutation>;
export type DeletePartnerMutationResult = Apollo.MutationResult<DeletePartnerMutation>;
export type DeletePartnerMutationOptions = Apollo.BaseMutationOptions<DeletePartnerMutation, DeletePartnerMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($options: UsernamePasswordInput!) {
  createUser(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdatedPartnerDocument = gql`
    mutation UpdatedPartner($id: Int!, $input: PartnerInput!) {
  updatedPartner(input: $input, id: $id) {
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
    }
  }
}
    `;
export type UpdatedPartnerMutationFn = Apollo.MutationFunction<UpdatedPartnerMutation, UpdatedPartnerMutationVariables>;

/**
 * __useUpdatedPartnerMutation__
 *
 * To run a mutation, you first call `useUpdatedPartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatedPartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatedPartnerMutation, { data, loading, error }] = useUpdatedPartnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatedPartnerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatedPartnerMutation, UpdatedPartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatedPartnerMutation, UpdatedPartnerMutationVariables>(UpdatedPartnerDocument, options);
      }
export type UpdatedPartnerMutationHookResult = ReturnType<typeof useUpdatedPartnerMutation>;
export type UpdatedPartnerMutationResult = Apollo.MutationResult<UpdatedPartnerMutation>;
export type UpdatedPartnerMutationOptions = Apollo.BaseMutationOptions<UpdatedPartnerMutation, UpdatedPartnerMutationVariables>;
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
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      url: // value for 'url'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      subtitle: // value for 'subtitle'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: Int!, $name: String!, $first_last_name: String!, $second_last_name: String!, $phone: String!, $direction: String!) {
  updatedUser(
    id: $id
    name: $name
    first_last_name: $first_last_name
    second_last_name: $second_last_name
    phone: $phone
    direction: $direction
  ) {
    id
    name
    first_last_name
    second_last_name
    phone
    direction
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      first_last_name: // value for 'first_last_name'
 *      second_last_name: // value for 'second_last_name'
 *      phone: // value for 'phone'
 *      direction: // value for 'direction'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PartnerDocument = gql`
    query Partner($id: Int!) {
  partner(id: $id) {
    id
    direction
    phone
    name
    second_last_name
    first_last_name
  }
}
    `;

/**
 * __usePartnerQuery__
 *
 * To run a query within a React component, call `usePartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartnerQuery(baseOptions: Apollo.QueryHookOptions<PartnerQuery, PartnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartnerQuery, PartnerQueryVariables>(PartnerDocument, options);
      }
export function usePartnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartnerQuery, PartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartnerQuery, PartnerQueryVariables>(PartnerDocument, options);
        }
export type PartnerQueryHookResult = ReturnType<typeof usePartnerQuery>;
export type PartnerLazyQueryHookResult = ReturnType<typeof usePartnerLazyQuery>;
export type PartnerQueryResult = Apollo.QueryResult<PartnerQuery, PartnerQueryVariables>;
export const PartnersDocument = gql`
    query Partners($limit: Int!, $cursor: String) {
  partners(cursor: $cursor, limit: $limit) {
    hasMore
    people {
      createdAt
      id
      second_last_name
      name
      first_last_name
      phone
      direction
    }
  }
}
    `;

/**
 * __usePartnersQuery__
 *
 * To run a query within a React component, call `usePartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePartnersQuery(baseOptions: Apollo.QueryHookOptions<PartnersQuery, PartnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartnersQuery, PartnersQueryVariables>(PartnersDocument, options);
      }
export function usePartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartnersQuery, PartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartnersQuery, PartnersQueryVariables>(PartnersDocument, options);
        }
export type PartnersQueryHookResult = ReturnType<typeof usePartnersQuery>;
export type PartnersLazyQueryHookResult = ReturnType<typeof usePartnersLazyQuery>;
export type PartnersQueryResult = Apollo.QueryResult<PartnersQuery, PartnersQueryVariables>;
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
      username
      peopleId
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
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

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const FetchUserDocument = gql`
    query FetchUser($id: String!) {
  fetchUser(id: $id) {
    ...RegularUserFindOneUser
  }
}
    ${RegularUserFindOneUserFragmentDoc}`;

/**
 * __useFetchUserQuery__
 *
 * To run a query within a React component, call `useFetchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchUserQuery(baseOptions: Apollo.QueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
      }
export function useFetchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchUserQuery, FetchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchUserQuery, FetchUserQueryVariables>(FetchUserDocument, options);
        }
export type FetchUserQueryHookResult = ReturnType<typeof useFetchUserQuery>;
export type FetchUserLazyQueryHookResult = ReturnType<typeof useFetchUserLazyQuery>;
export type FetchUserQueryResult = Apollo.QueryResult<FetchUserQuery, FetchUserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    peopleId
    username
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
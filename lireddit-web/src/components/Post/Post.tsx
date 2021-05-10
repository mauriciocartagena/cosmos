import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { Img } from "react-image";
import {
  usePostQuery,
  usePostsQuery,
  PostQuery,
} from "../../generated/graphql";
import SolidCompass from "../../icons/SolidCompass";
import { HeaderController } from "../../modules/display/HeaderController";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { MiddlePanel } from "../../modules/layouts/GridPanels";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { Button } from "../../ui/Button";
import { FeedHeader } from "../../ui/FeedHeader";
import { useIsAuth } from "../../utils/useIsAuth";
import ModalCreatePost from "./ModalCreatePost";
import ModalEditPost from "./ModalEditPost";
import { PostsQuery } from "../../generated/graphql";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  useIsAuth();
  const screenType = useScreenType();
  const [editModal, setEditModal] = useState(false);

  const [_id, set_id] = useState(0);

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: post, loading: fetchingPost } = usePostQuery({
    variables: {
      id: _id,
    },
  });

  const [createModal, setCreateModal] = useState(false);

  const IMAGE_DEFAULT = "https://i.blogs.es/f069a7/mandalorian1/450_1000.jpeg";
  const IMAGE_DEFAULT_LOADING =
    "https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif";

  if (!loading && !data) {
    return <div>tienes una consulta fallida por alguna razón</div>;
  }
  if (loading) {
    return null;
  }

  return (
    <>
      <HeaderController embed={{}} title="Post" />
      <DefaultDesktopLayout>
        <MiddlePanel
          stickyChildren={
            <FeedHeader
              actionTitle={"Nuevo post"}
              onActionClicked={() => setCreateModal(true)}
              title={"Post"}
            />
          }
        >
          <div className="flex flex-1 flex-col mb-7" data-testid="feed">
            <div className="flex flex-col space-y-4">
              {screenType === "fullscreen" ? (
                <Grid
                  templateRows="repeat(, 1fr)"
                  templateColumns={"repeat(2, 1fr)"}
                  gap={20}
                >
                  {!data && loading ? (
                    <div>cargando ...</div>
                  ) : (
                    data!.posts.posts.map((post, key) => (
                      <Box w={[300, 400, 560]} bg="blue.500" key={key}>
                        <Img
                          src={post.url}
                          defaultValue="https://i.blogs.es/f069a7/mandalorian1/450_1000.jpeg"
                          loading="lazy"
                          unloader={<Img src={IMAGE_DEFAULT} />}
                          loader={<Img src={IMAGE_DEFAULT_LOADING} />}
                          onError={(err) => console.log(err)}
                        />
                        <div className={`flex justify-between`}>
                          <div className="flex w-full">
                            <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all ">
                              <div className="w-full mt-2 flex">
                                <span className="text-accent">
                                  {post.title}
                                </span>
                              </div>
                              <div className="w-2/9">
                                <Button
                                  size="small"
                                  color="secondary"
                                  style={{ paddingRight: "0px" }}
                                  icon={<SolidCompass />}
                                  onClickCapture={() => {
                                    setEditModal(true);
                                    set_id(post.id);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className={`inline break-all`}>
                            <span className="text-primary-100">
                              {post.subtitle}
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
                            {post.description}
                          </div>
                        </div>
                      </Box>
                    ))
                  )}
                </Grid>
              ) : (
                <Grid
                  templateRows="repeat(, 1fr)"
                  templateColumns={"repeat(3, 1fr)"}
                  gap={20}
                >
                  {!data && loading ? (
                    <div>cargando ...</div>
                  ) : (
                    data!.posts.posts.map((post, key) => (
                      <Box w={[300, 400, 560]} bg="blue.500" key={key}>
                        <Img
                          src={post.url}
                          defaultValue="https://i.blogs.es/f069a7/mandalorian1/450_1000.jpeg"
                          loading="lazy"
                          unloader={<Img src={IMAGE_DEFAULT} />}
                          loader={<Img src={IMAGE_DEFAULT_LOADING} />}
                          onError={(err) => console.log(err)}
                        />

                        <div className={`flex justify-between`}>
                          <div className="flex w-full">
                            <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all ">
                              <div className="w-full mt-2 flex">
                                <span className="text-accent">
                                  {post.title}
                                </span>
                              </div>
                              <div className="w-2/9">
                                <Button
                                  size="small"
                                  color="secondary"
                                  style={{ paddingRight: "0px" }}
                                  icon={<SolidCompass />}
                                  onClickCapture={() => {
                                    setEditModal(true);
                                    set_id(post.id);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className={`inline break-all`}>
                            <span className="text-primary-100">
                              {post.subtitle}
                            </span>
                          </div>
                        </div>
                        <div className="w-full flex">
                          <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
                            {post.description}
                          </div>
                        </div>
                      </Box>
                    ))
                  )}
                </Grid>
              )}

              {data && data.posts.hasMore ? (
                <Flex m="auto" my={4}>
                  <Button
                    loading={loading}
                    data-testid="feed-action-button"
                    transition
                    onClick={() => {
                      fetchMore({
                        variables: {
                          limit: variables?.limit,
                          cursor:
                            data.posts.posts[data.posts.posts.length - 1]
                              .createdAt,
                        },
                        // updateQuery: (
                        //   previousValue,
                        //   { fetchMoreResult }
                        // ): PostsQuery => {
                        //   if (!fetchMoreResult) {
                        //     return previousValue as PostsQuery;
                        //   }

                        //   return {
                        //     __typename: "Query",
                        //     posts: {
                        //       __typename: "PaginatedPosts",
                        //       hasMore: (fetchMoreResult as PostsQuery).posts
                        //         .hasMore,
                        //       posts: [
                        //         ...(previousValue as PostsQuery).posts.posts,
                        //         ...(fetchMoreResult as PostsQuery).posts.posts,
                        //       ],
                        //     },
                        //   };
                        // },
                      });
                    }}
                  >
                    cargar mas
                  </Button>
                </Flex>
              ) : null}
            </div>
            {createModal && (
              <ModalCreatePost onRequestClose={() => setCreateModal(false)} />
            )}
            {editModal && !fetchingPost ? (
              <ModalEditPost
                pageProps={() => setEditModal(false)}
                onRequestClose={() => setEditModal(false)}
                id={post?.post?.id}
                title={post?.post?.title}
                subtitle={post?.post?.subtitle}
                description={post?.post?.description}
                type={post?.post?.type}
                url={post?.post?.url}
              />
            ) : null}
          </div>
        </MiddlePanel>
      </DefaultDesktopLayout>
    </>
  );
};

export default Post;

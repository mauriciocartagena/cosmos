import { Box, Grid, Flex } from "@chakra-ui/react";
import React from "react";
import { HeaderController } from "../../modules/display/HeaderController";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { MiddlePanel } from "../../modules/layouts/GridPanels";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { FeedHeader } from "../../ui/FeedHeader";
import { Img } from "react-image";

import { usePostsQuery } from "../../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../utils/useIsAuth";
import { useState } from "react";
import ModalCreatePost from "./ModalCreatePost";
import { Button } from "../../ui/Button";
import ModalEditPost from "./ModalEditPost";
import SolidCompass from "../../icons/SolidCompass";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  useIsAuth();
  const screenType = useScreenType();
  const [editModal, setEditModal] = useState(false);

  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [createModal, setCreateModal] = useState(false);

  const IMAGE_DEFAULT = "https://i.blogs.es/f069a7/mandalorian1/450_1000.jpeg";
  const IMAGE_DEFAULT_LOADING =
    "https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif";

  if (!fetching && !data) {
    return <div>tienes una consulta fallida por alguna razón</div>;
  }
  if (fetching) {
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
                  {!data && fetching ? (
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
                                  onClickCapture={() => setEditModal(true)}
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
                  {!data && fetching ? (
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
                                  onClickCapture={() => setEditModal(true)}
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
                    loading={fetching}
                    data-testid="feed-action-button"
                    transition
                    onClick={() => {
                      setVariables({
                        limit: variables.limit,
                        cursor:
                          data.posts.posts[data.posts.posts.length - 1]
                            .createdAt,
                      });
                    }}
                  >
                    cargar mas
                  </Button>
                </Flex>
              ) : null}
            </div>
            {createModal && (
              <ModalCreatePost
                pageProps={() => setCreateModal(false)}
                onRequestClose={() => setCreateModal(false)}
              />
            )}
            {editModal && (
              <ModalEditPost
                pageProps={() => setEditModal(false)}
                onRequestClose={() => setEditModal(false)}
                id
                title
                subtitle
                description
                type
                urli
              />
            )}
          </div>
        </MiddlePanel>
      </DefaultDesktopLayout>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Post);

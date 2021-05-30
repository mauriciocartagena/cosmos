import { Box, Flex, Grid, Image } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import ReactPlayer from "react-player/lazy";
import { usePostsQuery } from "../../generated/graphql";
import SvgSolidLogo from "../../icons/SvgSolidLogo";
import { HeaderController } from "../../modules/display/HeaderController";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { Button } from "../../ui/Button";
import { withApollo } from "../../utils/withApollo";

interface postsProps {}

const Posts: React.FC<postsProps> = ({}) => {
  const screenType = useScreenType();

  const IMAGE_DEFAULT =
    "https://fotos.perfil.com//2019/11/22/900/0/tesla-cybertruck-807820.jpg";

  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  if (!loading && !data) {
    return <div>tienes una consulta fallida por alguna razón</div>;
  }
  if (loading) {
    return null;
  }
  return (
    <>
      <div className="w-full">
        <HeaderController embed={{}} title="Post" />
        <div className="grid grid-cols-2 justify-items-center gap-4 pt-5 ">
          <div>
            <SvgSolidLogo />
          </div>
          <div>
            {screenType === "3-cols" ? (
              <Button onClickCapture={() => router.push("/")}>Regresar</Button>
            ) : (
              <div className="flex justify-center w-full">
                <Button onClickCapture={() => router.push("/")}>
                  Regresar
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className=" justify-center ">
          <h1
            style={{
              fontWeight: 900,
              textAlign: "center",
            }}
            className="text-primary-100"
          >
            Mentes Maestras
          </h1>
          <h2
            style={{
              fontStyle: "normal",
              textAlign: "center",
            }}
            className="text-primary-300"
          >
            Videos & Imagenes
          </h2>
        </div>

        <div className="w-24 min-w-full p-8">
          {screenType === "fullscreen" ? (
            <Grid
              templateRows="repeat(, 1fr)"
              templateColumns={"repeat(1, 1fr)"}
              gap={20}
            >
              {!data && loading ? (
                <div>cargando ...</div>
              ) : (
                data?.posts.posts.map((post, key) => (
                  <Box w={[300, 400, 860]} bg="blue.500" key={key}>
                    {post.type === "video" ? (
                      <div className="player-wrapper ">
                        <ReactPlayer
                          className="react-player bg-primary-800"
                          url={post.url}
                          controls
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ) : (
                      <Image
                        className="bg-primary-800"
                        width="100%"
                        src={post.url}
                        alt={post.description}
                        fallbackSrc={IMAGE_DEFAULT}
                      />
                    )}
                    <div className={`flex justify-between`}>
                      <div className="flex w-full">
                        <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all ">
                          <div className="w-full mt-2 flex justify-center">
                            <span className="text-accent">{post.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <div className={`inline break-all`}>
                        <span className="text-primary-100">
                          {post.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
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
                data?.posts.posts.map((post, key) => (
                  <Box boxSize="sm" w={[300, 400, 560]} bg="blue.500" key={key}>
                    {post.type === "video" ? (
                      <div className="player-wrapper bg-primary-800 ">
                        <ReactPlayer
                          className="react-player"
                          url={post.url}
                          controls
                          width="100%"
                          height="100%"
                        />
                      </div>
                    ) : (
                      <Image
                        className="bg-primary-800 rounded-8"
                        boxSize="574px"
                        src={post.url}
                        alt={post.description}
                        fallbackSrc={IMAGE_DEFAULT}
                      />
                    )}
                    <div className={`flex justify-between `}>
                      <div className="flex w-full">
                        <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all ">
                          <div className="w-full mt-2 flex justify-center">
                            <span className="text-accent">{post.title}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <div className={`inline break-all `}>
                        <span className="text-primary-100">
                          {post.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
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
            <Flex m="auto" my={4} className="justify-center p-4">
              <Button
                loading={loading}
                data-testid="feed-action-button"
                transition
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      cursor:
                        data.posts.posts[data.posts.posts.length - 1].createdAt,
                    },
                  });
                }}
              >
                cargar mas
              </Button>
            </Flex>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default withApollo({ ssr: false })(Posts);

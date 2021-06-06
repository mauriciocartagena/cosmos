import { Image } from "@chakra-ui/react";
import React from "react";
import ReactPlayer from "react-player/lazy";
import { usePostsQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

interface postsProps {
  className?: string;
}

const Posts: React.FC<postsProps> = ({ className }) => {
  const IMAGE_DEFAULT =
    "https://fotos.perfil.com//2019/11/22/900/0/tesla-cybertruck-807820.jpg";

  const { data, loading } = usePostsQuery({
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
    <div className={`grid justify-items-center pt-8 pb-2 ${className} `}>
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
      <div className="flex  flex-wrap ">
        {!data && loading ? (
          <div>cargando ...</div>
        ) : (
          data?.posts.posts.map((post, key) => (
            <div className="w-full sm:w-1/2 md:w-1/3 px-2" key={key}>
              {post.type === "video" ? (
                <div className="player-wrapper ">
                  <ReactPlayer
                    className="react-player bg-primary-800 rounded-lg"
                    url={post.url}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <Image
                  className="bg-primary-800 rounded-lg"
                  width="100%"
                  src={post.url}
                  alt={post.description}
                  fallbackSrc={IMAGE_DEFAULT}
                />
              )}
              <div className="px-6 py-4">
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
                    <span className="text-primary-100">{post.subtitle}</span>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
                    {post.description}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(Posts);

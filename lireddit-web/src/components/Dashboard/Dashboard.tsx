import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useParnetsQuery } from "../../generated/graphql";
import { CreatePartnerModal } from "../../modules/dashboard/CreatePartnerModal";
import { HeaderController } from "../../modules/display/HeaderController";
import { MiddlePanel } from "../../modules/GridPanels";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { FeedHeader } from "../../ui/FeedHeader";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../modules/auth/useIsAuth";
import { Button } from "../../ui/Button";
import { Flex } from "@chakra-ui/react";

const Dashboard: React.FC<{}> = ({}) => {
  useIsAuth();
  const [roomModal, setRoomModal] = useState(false);

  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = useParnetsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>tienes una consulta fallida por alguna razón</div>;
  }
  if (fetching) {
    return null;
  }

  return (
    <>
      <HeaderController embed={{}} title="Dasboard" />
      {data ? (
        <DefaultDesktopLayout>
          <MiddlePanel
            stickyChildren={
              <FeedHeader
                actionTitle={"Nuevo socio"}
                onActionClicked={() => setRoomModal(true)}
                title={"Socios"}
              />
            }
          >
            <div className="flex flex-1 flex-col mb-7" data-testid="feed">
              <div className="flex flex-col space-y-4">
                {data ? (
                  data.parnets.people.map((user, key) => (
                    <div className="flex" key={key}>
                      <div
                        className={`p-4 w-full text-base bg-primary-800 rounded-lg flex flex-col text-primary-100`}
                      >
                        <div className={`flex justify-between`}>
                          <div className="flex w-full">
                            <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all mb-4">
                              {user.name +
                                " " +
                                user.first_last_name +
                                " " +
                                user.second_last_name}
                            </div>
                            <div className="flex gap-2">
                              <div className={`inline break-all`}>
                                <span className="text-accent">
                                  {user.phone}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className={`flex justify-between`}>
                          <div className="flex flex-col">
                            <div className={`relative inline-flex mb-4`}>
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                }}
                                className={`ml-2 text-left flex-1`}
                              >
                                <div className="w-full mt-2 flex">
                                  <div className="text-left break-all truncate whitespace-pre-wrap line-clamp-2 text-primary-300">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={`relative inline-flex mb-4`}>
                              <div
                                style={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                }}
                                className={`ml-2 text-left flex-1`}
                              >
                                <span className="text-accent">
                                  {user.direction}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className={`inline break-all`}>
                              <span className="text-accent">
                                <Button
                                  style={{ marginRight: "0px" }}
                                  size="small"
                                  onClick={() => {}}
                                >
                                  Editar
                                </Button>
                              </span>
                            </div>
                            <div className={`inline break-all`}>
                              <span className="text-accent">
                                <Button size="small" onClick={() => {}}>
                                  Elimnar
                                </Button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Loading ...</div>
                )}
              </div>
            </div>
            {roomModal && (
              <CreatePartnerModal onRequestClose={() => setRoomModal(false)} />
            )}
            {data && data.parnets.hasMore ? (
              <Flex m="auto" my={4}>
                <Button
                  loading={fetching}
                  data-testid="feed-action-button"
                  transition
                  onClick={() => {
                    setVariables({
                      limit: variables.limit,
                      cursor:
                        data.parnets.people[data.parnets.people.length - 1]
                          .createdAt,
                    });
                  }}
                >
                  cargar mas
                </Button>
              </Flex>
            ) : null}
          </MiddlePanel>
        </DefaultDesktopLayout>
      ) : null}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
  Dashboard as any
);

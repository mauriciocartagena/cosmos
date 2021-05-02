import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useUsersQuery } from "../../generated/graphql";
import { CreatePartnerModal } from "../../modules/dashboard/CreatePartnerModal";
import { HeaderController } from "../../modules/display/HeaderController";
import { MiddlePanel } from "../../modules/GridPanels";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { FeedHeader } from "../../ui/FeedHeader";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAuth } from "../../modules/auth/useIsAuth";
import { isServer } from "../../utils/isServer";

const Dashboard: React.FC<{}> = ({}) => {
  useIsAuth();
  const [roomModal, setRoomModal] = useState(false);

  const [{ data }] = useUsersQuery({
    pause: isServer(),
  });

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
                  data.users.map((user) => (
                    <div className="flex">
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
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={`flex justify-between`}>
                          <div className="flex flex-col">
                            <div className={`relative inline-flex mb-4`}>
                              {/* <SingleUser size="xs" src={creator.avatarUrl} /> */}
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
                              {/* <SingleUser size="xs" src={creator.avatarUrl} /> */}
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
          </MiddlePanel>
        </DefaultDesktopLayout>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Dashboard as any);

import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useDeletePartnerMutation,
  usePartnersQuery,
  usePartnerQuery,
} from "../../generated/graphql";
import { CreatePartnerModal } from "../../modules/dashboard/CreatePartnerModal";
import EditPartnerModal from "../../modules/dashboard/EditPartnerModal";
import { HeaderController } from "../../modules/display/HeaderController";
import { MiddlePanel } from "../../modules/GridPanels";
import { DefaultDesktopLayout } from "../../modules/layouts/DefaultDesktopLayout";
import { Button } from "../../ui/Button";
import { FeedHeader } from "../../ui/FeedHeader";
import { withApollo } from "../../utils/withApollo";
import { WaitForWsAndAuth } from "../../modules/auth/WaitForWsAndAuth";

interface DasboardProps {}
const Dashboard: React.FC<DasboardProps> = ({}) => {
  const [roomModal, setRoomModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [_id, set_id] = useState(0);

  const [deletePartner] = useDeletePartnerMutation();

  const { data, loading, fetchMore, variables } = usePartnersQuery({
    variables: {
      limit: 10,
      cursor: null,
    },
  });

  const { data: partner, loading: fetchingPartner } = usePartnerQuery({
    variables: {
      id: _id,
    },
  });

  if (!loading && !data) {
    return <div>tienes una consulta fallida por alguna razón</div>;
  }
  if (loading) {
    return null;
  }
  return (
    <WaitForWsAndAuth>
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
                {!data && loading ? (
                  <div>cargando ...</div>
                ) : (
                  data!.partners.people.map((user, key) => (
                    <div className="flex" key={key}>
                      <div
                        className={`p-4 w-full text-base bg-primary-800 rounded-lg flex flex-col text-primary-100`}
                      >
                        <div className={`flex justify-between`}>
                          <div className="flex w-full">
                            <div className="flex flex-1 font-bold text-ellipsis overflow-hidden break-all mb-4">
                              {user.name}
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
                                    {user.first_last_name +
                                      " " +
                                      user.second_last_name}
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
                                  onClickCapture={() => (
                                    setEditModal(true), set_id(user.id)
                                  )}
                                >
                                  Editar
                                </Button>
                              </span>
                            </div>
                            <div className={`inline break-all`}>
                              <span className="text-accent">
                                <Button
                                  size="small"
                                  onClick={async () => {
                                    await deletePartner({
                                      variables: { id: user.id },
                                      update: (cache) => {
                                        cache.evict({
                                          fieldName: "partners:{}",
                                        });
                                      },
                                    });
                                  }}
                                >
                                  Elimnar
                                </Button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {data && data.partners.hasMore ? (
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
                          data.partners.people[data.partners.people.length - 1]
                            .createdAt,
                      },
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

      {roomModal && (
        <CreatePartnerModal
          title={"Registrar Socio"}
          onRequestClose={() => setRoomModal(false)}
        />
      )}
      {editModal && !fetchingPartner ? (
        <EditPartnerModal
          onRequestClose={() => setEditModal(false)}
          id={_id}
          name={partner?.partner?.name}
          first_last_name={partner?.partner?.first_last_name}
          second_last_name={partner?.partner?.second_last_name}
          phone={partner?.partner?.phone}
          direction={partner?.partner?.direction}
        />
      ) : null}
    </WaitForWsAndAuth>
  );
};
export default withApollo({ ssr: true })(Dashboard);

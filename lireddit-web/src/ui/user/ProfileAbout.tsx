import React, { useState } from "react";
import { Button } from "../../form-fields/Button";
import { useFetchUserQuery, useMeQuery } from "../../generated/graphql";
import { SolidSettings } from "../../icons";
import { isServer } from "../../utils/isServer";
import { EditAccountModal } from "./EditAccountModal";
export interface ProfileAboutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  first_last_name: string;
  second_last_name: string;
  phone: string;
  direction: string;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
  name,
  first_last_name,
  second_last_name,
  phone,
  direction,
  className = "",
}) => {
  const { data } = useMeQuery({
    skip: isServer(),
  });

  const { data: user, fetchMore } = useFetchUserQuery({
    variables: {
      id: data?.me ? data?.me?.peopleId.toString() : "",
    },
  });
  const [editModal, setEditModal] = useState(false);

  return (
    <div
      className={`mt-2 bg-primary-800 p-4 rounded-8 w-full leading-8 ${className}`}
      style={{ maxWidth: 640 }}
    >
      <div className="text-primary-100 font-bold text-xl pb-4 text-accent font-bold text-sm">
        Sobre {name}
      </div>
      <div className="flex mb-2">
        <div className="flex group mr-4">
          <span className="text-primary-100 font-bold">Primer Apellido: </span>
          <span className="text-primary-300 ml-1  ">{first_last_name}</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex group">
          <span className="text-primary-100 font-bold">Segundo Apellido: </span>
          <span className="text-primary-300 ml-1  ">{second_last_name}</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex group">
          <span className="text-primary-100 font-bold">Dirección: </span>
          <span className="text-primary-300 ml-1  ">{direction}</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="flex group">
          <span className="text-primary-100 font-bold">Celular: </span>
          <span className="text-primary-300 ml-1  ">{phone}</span>
        </div>
      </div>

      <div className="flex justify-end ">
        <div className="sm:w-2/1">
          <Button
            size="small"
            color="secondary"
            icon={<SolidSettings />}
            onClick={async () => {
              await fetchMore({
                variables: {
                  id: !data?.me ? "" : data.me.peopleId.toString(),
                },
              }),
                setEditModal(true);
            }}
          >
            Editar Perfil
          </Button>
        </div>
      </div>
      {editModal && (
        <EditAccountModal
          id={!data?.me ? 0 : data.me.peopleId}
          direction={!user ? "" : user.fetchUser.creator.direction}
          email={!user ? "" : user.fetchUser.email}
          first_last_name={!user ? "" : user.fetchUser.creator.first_last_name}
          name={!user ? "" : user.fetchUser.creator.name}
          phone={!user ? "" : user.fetchUser.creator.phone}
          second_last_name={
            !user ? "" : user.fetchUser.creator.second_last_name
          }
          onRequestClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

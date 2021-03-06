import React, { useState } from "react";
import { useMeQuery, useFetchUserQuery } from "../../generated/graphql";
import { SolidCompass } from "../../icons";
import { Button } from "../../ui/Button";
import { isServer } from "../../utils/isServer";
import { ProfileHeaderWrapper } from "../ProfileHeaderWrapper";
import { SingleUser } from "../UserAvatar/SingleUser";
import { ModalEditUser } from "./ModalEditUser";
import { ProfileAbout } from "./ProfileAbout";

interface UserProfileControllerProps {}

export const UserProfileController: React.FC<UserProfileControllerProps> =
  ({}) => {
    const [editModal, setEditModal] = useState(false);
    const { data, loading } = useMeQuery({
      skip: isServer(),
    });
    const { data: user } = useFetchUserQuery({
      variables: {
        id: data?.me ? data.me.peopleId.toString() : "",
      },
    });

    return (
      <>
        <ProfileHeaderWrapper coverUrl={"https://source.unsplash.com/random"}>
          <div className="flex mr-4">
            <SingleUser
              isOnline={true}
              username={data?.me?.username!}
              className="absolute flex-none -top-5.5 rounded-full shadow-outlineLg bg-primary-900"
              src={data?.me?.url!}
            />
          </div>
          <div className="flex flex-col w-3/6 font-sans">
            <h4 className="text-primary-100 font-bold truncate">
              {data?.me?.username}
            </h4>
            <div className="flex flex-row items-center">
              <p
                className="text-primary-300 mr-2"
                data-testid="profile-info-username"
              >
                {`${data?.me?.email}`}
              </p>
            </div>
          </div>

          <div className="sm:w-3/6">
            <div className="flex flex-row justify-end content-end gap-2">
              <Button
                size="small"
                color="secondary"
                icon={<SolidCompass />}
                onClick={() => setEditModal(true)}
              >
                Editar cuenta
              </Button>
            </div>
          </div>
        </ProfileHeaderWrapper>
        <ProfileAbout
          name={user?.fetchUser.creator.name!}
          first_last_name={user?.fetchUser.creator.first_last_name!}
          second_last_name={user?.fetchUser.creator.second_last_name!}
          phone={user?.fetchUser.creator.phone!}
          direction={user?.fetchUser.creator.direction!}
        />
        {editModal && !loading && (
          <ModalEditUser
            onRequestClose={() => setEditModal(false)}
            id={data?.me?.peopleId!}
            username={data?.me?.username!}
            email={data?.me?.email!}
            urlImage={data?.me?.url!}
          />
        )}
      </>
    );
  };

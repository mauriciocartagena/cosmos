import React, { Ref, useState } from "react";
import { SearchBar } from "../../ui/Search/SearchBar";
import { SearchOverlay } from "./SearchOverlay";
import { usePartnerLastNameQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { InfoText } from "../../ui/InfoText";
import { UserSearchResult } from "./SearchResult/UserSearchResult";
import Downshift, { GetInputPropsOptions } from "downshift";
import EditPartnerModal from "../dashboard/EditPartnerModal";

interface SearchControllerProps {}
interface GetInputPropsOptionsRef extends GetInputPropsOptions {
  ref?: Ref<HTMLInputElement>;
}

const SearchBarController: React.FC<SearchControllerProps> = ({}) => {
  const [partner, setPartner] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [dataPartner, setDataPartner] = useState({
    id: 0,
    name: "",
    first_last_name: "",
    second_last_name: "",
    phone: "",
    direction: "",
  });
  const { data } = usePartnerLastNameQuery({
    variables: {
      first_last_name: partner,
    },
  });

  return (
    <>
      <Downshift>
        {({ getInputProps, isOpen, getRootProps }) => (
          <div
            className="relative w-full z-10 flex flex-col"
            {...(getInputProps() as GetInputPropsOptionsRef)}
          >
            <SearchBar
              onChange={(e) => {
                setPartner(e.target.value);
              }}
              placeholder={"Buscar"}
            />
            {isOpen ? (
              <SearchOverlay
                {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
              >
                <ul className="w-full px-2 mb-2 mt-7 bg-primary-800 rounded-b-8 overflow-y-auto">
                  {!data?.partnerLastName?.peoples ? (
                    <InfoText className="p-3">no results</InfoText>
                  ) : (
                    data.partnerLastName.peoples.map((partner) => (
                      <UserSearchResult
                        user={{
                          name: partner.name,
                          first_last_name: partner.first_last_name,
                          second_last_name: partner.second_last_name,
                          avatar: partner.name,
                        }}
                        onClick={() => (
                          setDataPartner({
                            id: partner.id,
                            name: partner.name,
                            first_last_name: partner.first_last_name,
                            second_last_name: partner.second_last_name,
                            phone: partner.phone,
                            direction: partner.direction,
                          }),
                          setEditModal(true)
                        )}
                      />
                    ))
                  )}
                </ul>
              </SearchOverlay>
            ) : null}
          </div>
        )}
      </Downshift>
      {editModal && dataPartner ? (
        <EditPartnerModal
          onRequestClose={() => setEditModal(false)}
          id={dataPartner.id}
          name={dataPartner.name}
          first_last_name={dataPartner.first_last_name}
          second_last_name={dataPartner.second_last_name}
          phone={dataPartner.phone}
          direction={dataPartner?.direction}
        />
      ) : null}
    </>
  );
};

export default withApollo({ ssr: false })(SearchBarController);

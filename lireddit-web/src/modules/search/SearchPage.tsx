import React, { useState } from "react";
import { withApollo } from "../../utils/withApollo";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopLayout";
import { SearchHeader } from "../../ui/mobile/SearchHeader";
import { useScreenType } from "../../shared-hooks/useScreenType";
import router from "next/router";
import { UserSearchResult } from "./SearchResult/UserSearchResult";
import { usePartnerLastNameQuery } from "../../generated/graphql";
import { InfoText } from "../../ui/InfoText";
import EditPartnerModal from "../dashboard/EditPartnerModal";

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = ({}) => {
  const screenType = useScreenType();

  if (screenType !== "fullscreen") router.push("/dasboard");

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
  const { data, loading } = usePartnerLastNameQuery({
    variables: {
      first_last_name: partner,
    },
  });

  return (
    <WaitForWsAndAuth>
      <HeaderController embed={{}} title="Search" />
      <DefaultDesktopLayout
        mobileHeader={
          <SearchHeader
            onSearchChange={(e) => {
              setPartner(e.target.value);
            }}
            searchPlaceholder="Buscar socio"
            onBackClick={() => router.back()}
            searchLoading={loading}
          />
        }
      >
        <div className="h-full w-full">
          {data?.partnerLastName?.peoples &&
            data?.partnerLastName.peoples.map((partner) => (
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
            ))}
          {!data?.partnerLastName.peoples?.length && (
            <InfoText className="pr-4 pl-5 py-3">no hay resultados</InfoText>
          )}
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
        </div>
      </DefaultDesktopLayout>
    </WaitForWsAndAuth>
  );
};
export default withApollo({ ssr: true })(SearchPage);

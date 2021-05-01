import React from "react";
import { SearchBar } from "../../ui/Search/SearchBar";

interface SearchControllerProps {}

export const SearchBarController: React.FC<SearchControllerProps> = ({}) => {
  return (
    <div className="relative w-full z-10 flex flex-col">
      <SearchBar placeholder={"Buscar"} />
      {/* {isOpen ? (
        <SearchOverlay
          {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
        >
          <ul
            className="w-full px-2 mb-2 mt-7 bg-primary-800 rounded-b-8 overflow-y-auto"
            {...getMenuProps({ style: { top: 0 } })}
          >
            {data?.items.length === 0 ? (
              <InfoText className="p-3">no results</InfoText>
            ) : null}
            {data?.items.map((item, index) =>
              "username" in item ? (
                // eslint-disable-next-line react/jsx-key
                <li
                // data-testid={`search:user:${item.username}`}
                // {...getItemProps({
                //   key: item.id,
                //   index,
                //   item,
                // })}
                >
                  <UserSearchResult
                    user={{
                      username: item.username,
                      displayName: item.displayName,
                      isOnline: item.online,
                      avatar: item.avatarUrl,
                    }}
                    className={
                      highlightedIndex === index
                        ? "bg-primary-700"
                        : "bg-primary-800"
                    }
                  />
                </li>
              ) : (
                <li
                // {...getItemProps({
                //   key: item.id,
                //   index,
                //   item,
                // })}
                >
                  <RoomSearchResult
                    room={{
                      displayName: item.name,
                      hosts: item.peoplePreviewList,
                      userCount: item.numPeopleInside,
                    }}
                  />
                </li>
              )
            )}
          </ul>
        </SearchOverlay>
      ) : null} */}
    </div>
  );
};

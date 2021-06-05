import React, { useState } from "react";
import { CreatePartnerModal } from "../modules/dashboard/CreatePartnerModal";
import Posts from "../pages/posts";
import { About } from "../pages/info/about";

export interface ProfileTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs?: {
    about?: boolean;
    posts?: boolean;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  className,
  tabs = {
    about: true,
    posts: true,
  },
  ...props
}) => {
  const [activeTab, setActiveTab] = useState("about");
  const [roomModal, setRoomModal] = useState(false);

  return (
    <>
      <div
        className={`w-full flex items-center justify-around pt-4 ${className}`}
        {...props}
      >
        <button
          className={`py-1 text-primary-100 text-base font-bold border-b-2 border-primary-900 transition hover:border-accent focus:outline-no-chrome
               ${activeTab === "about" && `border-accent text-accent`} ${
            !tabs.about ? "hidden" : ""
          }`}
          onClick={() => {
            setActiveTab("about");
          }}
        >
          Sobre nosotros
        </button>
        <button
          className={`py-1 text-primary-100 text-base font-bold border-b-2 border-primary-900 transition hover:border-accent focus:outline-no-chrome
               `}
          onClick={() => {
            setRoomModal(true);
          }}
        >
          Volverse Socio
        </button>

        <button
          className={`py-1 text-primary-100 text-base font-bold border-b-2 border-primary-900 transition hover:border-accent focus:outline-no-chrome
               ${activeTab === "posts" && `border-accent text-accent`} ${
            !tabs.posts ? "hidden" : ""
          }`}
          onClick={() => setActiveTab("posts")}
        >
          Ver posts
        </button>
      </div>

      <div>
        {roomModal && (
          <CreatePartnerModal
            title={"Formulario de registro nuevo socio"}
            onRequestClose={() => setRoomModal(false)}
          />
        )}
        <About className={activeTab !== "about" ? "hidden" : ""} />
        <Posts className={activeTab !== "posts" ? "hidden" : ""} />
      </div>
    </>
  );
};

import React from "react";
import Header from "next/head";
import { NextPage } from "next";
// import { baseUrl } from "../../lib/constants";
export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  owner?: string;
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "MentesMaestras ",
  owner,
  additionalKeywords = [],
  embed,
}) => {
  return (
    <Header>
      {title ? (
        <title>{title} | MentesMaestras</title>
      ) : (
        <title>MentesMaestras</title>
      )}
      <meta name="description" content={description} />
      {owner ? <meta name="author" content={owner} /> : ""}
      <meta
        name="keywords"
        content={`MentesMaestras, ${additionalKeywords?.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "MentesMaestras"} />
          <meta
            name="og:type"
            content={owner ? "music.radio_station" : "website"}
          />
          {owner ? <meta name="music:creator" content={owner} /> : ""}
          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="" />
          <meta name="og:image" content={"../../../public/img/mentes.png"} />
          {/* <meta
            name="og:image"
            content={`${
              baseUrl || "https://imgcosmos.s3.amazonaws.com"
            }/logoMind.png`}
          /> */}
        </>
      ) : (
        ""
      )}
    </Header>
  );
};

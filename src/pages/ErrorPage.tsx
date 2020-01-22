import React, {useState} from "react";

interface Props {
  errType: string;
}

export const ErrorPage: React.FC<Props> = ({errType}) => {
  let errorMsg = "";

  // Render
  switch (errType) {
    case "no selected cat":
      errorMsg =
        "Somehow you're on a Category Page without a Category to Select";
      break;

    default:
      break;
  }

  return <div>{errorMsg}</div>;
};

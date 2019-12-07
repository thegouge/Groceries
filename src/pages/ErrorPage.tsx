import React from "react";

interface Props {
  errType: string;
}

export const ErrorPage: React.FC<Props> = ({errType}) => {
  let errorMsg;

  switch (errType) {
    case "no selected cat":
      break;

    default:
      errorMsg = "Something has gone wrong";
      break;
  }
  return <div></div>;
};

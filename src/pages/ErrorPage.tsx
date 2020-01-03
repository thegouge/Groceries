import React, {useState} from "react";

interface Props {
  errType: string;
}

export const ErrorPage: React.FC<Props> = ({errType}) => {
  // State
  const [errorMsg, setError] = useState("Something Has Gone Wrong");

  // Render
  switch (errType) {
    case "no selected cat":
      setError(
        "Somehow you're on a Category Page without a Category to Select"
      );
      break;

    default:
      break;
  }

  return <div>{errorMsg}</div>;
};

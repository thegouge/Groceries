import React, {useState, useEffect} from "react";

import {CategoryClass} from "../lib/interfaces";

interface globalContextProps {
  removing: boolean;
  toggleRemoving: () => void;
}

const GlobalContext = React.createContext({} as globalContextProps);

const GlobalProvider = (props: any) => {
  const [removing, setRemove] = useState(false);

  const toggleRemoving = () => {
    setRemove(!removing);
  };

  return (
    <GlobalContext.Provider value={{removing, toggleRemoving}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};

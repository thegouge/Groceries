import React, {useState} from "react";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

interface globalContextProps {
  removing: boolean;
  toggleRemoving: () => void;
  reset: () => void;
}

const GlobalContext = React.createContext({} as globalContextProps);

const GlobalProvider = (props: any) => {
  const [removing, setRemove] = useState(false);

  const toggleRemoving = () => {
    setRemove(!removing);
  };

  const reset = () => {
    console.log("resetting EVERYTHING");

    Storage.clear();
  };

  return (
    <GlobalContext.Provider value={{removing, toggleRemoving, reset}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};

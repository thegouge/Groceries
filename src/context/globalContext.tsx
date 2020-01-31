import React, {useState} from "react";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

interface globalContextProps {
  reset: () => Promise<any>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const GlobalContext = React.createContext({} as globalContextProps);

const GlobalProvider = (props: any) => {
  // State
  const [darkMode, setDarkMode] = useState(false);

  // Methods
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const reset = async () => {
    console.log("resetting EVERYTHING");
    await Storage.clear();
  };

  return (
    <GlobalContext.Provider
      value={{
        reset,
        darkMode,
        toggleDarkMode,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};

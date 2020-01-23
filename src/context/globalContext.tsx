import React, {useState, useContext} from "react";
import {Plugins} from "@capacitor/core";
import {CategoryContext} from "./categoryContext";

const {Storage} = Plugins;

interface globalContextProps {
  removing: boolean;
  toggleRemove: () => void;
  reset: () => Promise<any>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const GlobalContext = React.createContext({} as globalContextProps);

const GlobalProvider = (props: any) => {
  // State
  const [removing, setRemove] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Methods
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const reset = async () => {
    console.log("resetting EVERYTHING");
    await Storage.clear();
  };

  const toggleRemove = () => {
    setRemove(!removing);
  };

  return (
    <GlobalContext.Provider
      value={{
        removing,
        toggleRemove,
        reset,
        darkMode,
        toggleDarkMode,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};

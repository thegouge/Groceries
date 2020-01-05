import React, {useState, useContext} from "react";
import {Plugins} from "@capacitor/core";
import {ItemContext} from "./itemContext";
import {CategoryContext} from "./categoryContext";

const {Storage} = Plugins;

interface globalContextProps {
  removing: boolean;
  toggleRemoving: () => void;
  reset: () => Promise<any>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const GlobalContext = React.createContext({} as globalContextProps);

const GlobalProvider = (props: any) => {
  // Context
  const {loadItems} = useContext(ItemContext);
  const {resetCats} = useContext(CategoryContext);

  // State
  const [removing, setRemove] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleRemoving = () => {
    setRemove(!removing);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const reset = async () => {
    console.log("resetting EVERYTHING");
    await Storage.clear();
  };

  return (
    <GlobalContext.Provider
      value={{removing, toggleRemoving, reset, darkMode, toggleDarkMode}}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export {GlobalContext, GlobalProvider};

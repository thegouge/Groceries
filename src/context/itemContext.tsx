import React, {useState} from "react";

import {itemList} from "../lib/defaultData";
import {Item} from "../lib/interfaces";

interface itemContextProps {
  itemsList: Item[];
  setItemsList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  const [itemsList, setItemsList] = useState(itemList);

  return (
    <ItemContext.Provider value={{itemsList, setItemsList}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

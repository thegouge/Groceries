import React, {useState, useContext} from "react";

import {ItemClass} from "../lib/interfaces";
import {defaultItemList} from "../lib/defaultData";
import {GlobalContext} from ".";

interface itemContextProps {
  itemsList: ItemClass[];
  addItem: (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => void;
  checkItem: (itemName: string) => void;
  removeItem: (idToRemove: number) => void;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  const [itemsList, setItemsList] = useState(defaultItemList);

  const {toggleRemoving} = useContext(GlobalContext);

  const checkItem = (itemName: string) => {
    const indexToCheck = itemsList.findIndex((item) => itemName === item.name);

    setItemsList(
      itemsList.map((item, index) => {
        if (index === indexToCheck) {
          return {...item, isChecked: !item.isChecked};
        }
        return item;
      })
    );
  };

  const addItem = (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => {
    const item = {
      name: newItem.name,
      quantity: newItem.quantity,
      isChecked: false,
      id: 8,
      catId: newItem.category,
    };

    setItemsList([...itemsList, item]);
  };

  const removeItem = (idToRemove: number) => {
    setItemsList(itemsList.filter((item) => item.id !== idToRemove));
    toggleRemoving();
  };

  return (
    <ItemContext.Provider value={{itemsList, checkItem, addItem, removeItem}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

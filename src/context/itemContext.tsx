import React, {useState, useContext, useEffect} from "react";

import {ItemClass} from "../lib/interfaces";
import {defaultItemList} from "../lib/defaultData";
import {GlobalContext} from ".";

import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

interface itemContextProps {
  itemsList: ItemClass[];
  addItem: (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => void;
  checkItem: (itemName: string) => void;
  removeChecked: () => void;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  const [itemsList, setItemsList] = useState(defaultItemList);

  const {toggleRemoving} = useContext(GlobalContext);

  const saveItems = async (newList: ItemClass[]) => {
    console.log("Saving items...");
    await Storage.set({key: "items", value: JSON.stringify(newList)});
  };

  const loadItems = async () => {
    console.log("loading items...");
    const data = await Storage.get({key: "items"});
    if (data.value === null) {
      console.log("null!");
      return itemsList;
    } else {
      return JSON.parse(data.value);
    }
  };

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

  useEffect(() => {
    loadItems().then((data) => setItemsList(data));
  }, []);

  const addItem = (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => {
    const newList = [
      ...itemsList,
      {
        name: newItem.name,
        quantity: newItem.quantity,
        isChecked: false,
        id: 8,
        catId: newItem.category,
      },
    ];

    setItemsList(newList);
    saveItems(newList);
  };

  const removeChecked = () => {
    const newList = itemsList.filter((item) => !item.isChecked);

    toggleRemoving();

    setTimeout(() => {
      setItemsList(newList);
      saveItems(newList);
      toggleRemoving();
    }, 300);
  };

  return (
    <ItemContext.Provider
      value={{itemsList, checkItem, addItem, removeChecked}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

import React, {useState, useContext, useEffect} from "react";

import {ItemClass} from "../lib/interfaces";
import {defaultItemList, defaultCategoriesList} from "../lib/defaultData";
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
  loadItems: () => Promise<any>;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  // Context
  const {setRemove} = useContext(GlobalContext);

  // State
  const [itemsList, setItemsList] = useState(defaultItemList);

  // Methods
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

    setRemove(true);

    setTimeout(() => {
      setItemsList(newList);
      saveItems(newList);
      setRemove(false);
    }, 300);
  };

  // Render
  useEffect(() => {
    loadItems().then((data) => setItemsList(data));
  }, []);

  return (
    <ItemContext.Provider
      value={{itemsList, checkItem, addItem, removeChecked, loadItems}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

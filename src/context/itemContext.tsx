import React, {useState, useEffect} from "react";

import {ItemClass} from "../lib/interfaces";
import firebase from "firebase";
import {useItems} from "../hooks/useItems";
import {defaultItemList} from "../lib/defaultData";

interface itemContextProps {
  itemsList: ItemClass[];
  addItem: (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => void;
  checkItem: (itemName: string) => void;
  deleteCheckedItems: () => void;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  const [itemsList, setItemsList] = useState(defaultItemList);

  // const userRef = firebase
  //   .firestore()
  //   .collection("users")
  //   .doc("Am6rTGvRXoLscCOIAVLe");

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
    // userRef
    //   .collection("items")
    //   .doc(item.name)
    //   .set(item);
  };

  const deleteCheckedItems = () => {
    setItemsList(itemsList.filter((item) => !item.isChecked));
  };

  return (
    <ItemContext.Provider
      value={{itemsList, checkItem, addItem, deleteCheckedItems}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

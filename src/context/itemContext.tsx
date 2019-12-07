import React, {useState, useEffect} from "react";

import {Item} from "../lib/interfaces";
import firebase from "firebase";
import {useItems} from "../hooks/useItems";

interface itemContextProps {
  itemsList: Item[];
  addItem: (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => void;
  checkItem: (itemName: string) => void;
  deleteCheckedItems: (checkedList: Item[]) => void;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  const {itemsList, setItemsList} = useItems();

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc("Am6rTGvRXoLscCOIAVLe");

  // ToDo: get this off the database, keep 'isChecked' local
  const checkItem = (itemName: string) => {
    const itemToCheck = itemsList.findIndex((item) => itemName === item.name);
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

  const deleteCheckedItems = (checkedList: Item[]) => {
    // const batch = firebase.firestore().batch();
    // const fireList = userRef.collection("items");
    // checkedList.forEach((item) => {
    //   batch.delete(fireList.doc(item.name));
    // });
    // batch.commit();
  };

  return (
    <ItemContext.Provider
      value={{itemsList, checkItem, addItem, deleteCheckedItems}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

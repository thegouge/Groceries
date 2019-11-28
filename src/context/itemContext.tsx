import React, {useState, useEffect} from "react";

import {defaultItemList} from "../lib/defaultData";
import {Item} from "../lib/interfaces";
import firebase from "firebase";

interface itemContextProps {
  itemList: Item[];
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
  const [itemList, setItemsList] = useState(defaultItemList);

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc("Am6rTGvRXoLscCOIAVLe");

  // ToDo: get this off the database, keep 'isChecked' local
  const checkItem = (itemName: string) => {
    const itemToCheck = itemList.findIndex((item) => itemName === item.name);
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

    setItemsList([...itemList, item]);
    userRef
      .collection("items")
      .doc(item.name)
      .set(item);
  };

  const deleteCheckedItems = (checkedList: Item[]) => {
    const batch = firebase.firestore().batch();
    const fireList = userRef.collection("items");

    checkedList.forEach((item) => {
      batch.delete(fireList.doc(item.name));
    });

    batch.commit();
  };

  useEffect(() => {
    console.log("reading Items!");
    userRef
      .collection("items")
      .get()
      .then((snapshot) => {
        const itemListToPush: any[] = [];

        snapshot.forEach((doc) => {
          itemListToPush.push({...doc.data(), isChecked: false});
        });

        setItemsList(itemListToPush);
      })
      .catch((error) => {
        console.error(error);
        setItemsList(defaultItemList);
      });
  }, []);

  return (
    <ItemContext.Provider
      value={{itemList, checkItem, addItem, deleteCheckedItems}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

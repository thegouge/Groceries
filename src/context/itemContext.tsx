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
  resetItemList: (newList: Item[]) => void;
}

const ItemContext = React.createContext({} as itemContextProps);
const ItemProvider = (props: any) => {
  const [itemList, setItemsList] = useState(defaultItemList);

  const addItem = (newItem: {
    name: string;
    quantity: string;
    category: number;
  }) => {
    setItemsList([
      ...itemList,
      {
        name: newItem.name,
        quantity: newItem.quantity,
        isChecked: false,
        id: 8,
        catId: newItem.category,
      },
    ]);
  };

  const resetItemList = (newList: Item[]) => {
    setItemsList(newList);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc("Am6rTGvRXoLscCOIAVLe")
      .collection("items")
      .get()
      .then((snapshot) => {
        const itemListToPush: any[] = [];

        snapshot.forEach((doc) => {
          itemListToPush.push(doc.data());
        });

        setItemsList(itemListToPush);
      })
      .catch((error) => {
        console.error(error);
        setItemsList(defaultItemList);
      });
  }, []);

  return (
    <ItemContext.Provider value={{itemList, addItem, resetItemList}}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

import {useState, useEffect} from "react";
import firebase from "firebase";
import {ItemClass} from "../lib/interfaces";
import {defaultItemList} from "../lib/defaultData";

export const useItems = () => {
  const [itemsList, setItemsList] = useState(defaultItemList);

  const userId = "Am6rTGvRXoLscCOIAVLe";

  useEffect(() => {
    console.log("reading Items!");
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(userId)
    //   .collection("items")
    //   .get()
    //   .then((snapshot) => {
    //     const itemListToPush = snapshot.docs.map((item) => {
    //       return {
    //         ...item.data(),
    //         isChecked: false,
    //       } as Item;
    //     });

    //     setItemsList(itemListToPush);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setItemsList(defaultItemList);
    //   });
  }, []);

  return {itemsList, setItemsList};
};

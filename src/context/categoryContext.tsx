import React, {useState, useEffect} from "react";

import {firebase} from "../firebase";

import {testList} from "../lib/defaultData";
import {CategoryClass} from "../lib/interfaces";

interface catContextProps {
  categoriesList: CategoryClass[];
  addCategory: (category: any) => void;
  resetCategoryList: (newList: CategoryClass[]) => void;
}

const CategoryContext = React.createContext({} as catContextProps);
const CategoryProvider = (props: any) => {
  const [categoriesList, setCategoriesList] = useState(testList);

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc("Am6rTGvRXoLscCOIAVLe");

  const addCategory = (categoryToAdd: {name: string; color: string}) => {
    const category: CategoryClass = {...categoryToAdd, id: 8};
    userRef
      .collection("categories")
      .doc(category.name)
      .set(category);
  };

  const resetCategoryList = (newList: CategoryClass[]) => {
    setCategoriesList(newList);
    userRef.collection("categories");
  };

  useEffect(() => {
    userRef
      .collection("categories")
      .get()
      .then((snapshot) => {
        const catListToSend: any[] = [];

        snapshot.forEach((doc) => {
          catListToSend.push(doc.data());
        });

        setCategoriesList(catListToSend);
      })
      .catch((error) => {
        console.error(error);
        setCategoriesList(testList);
      });
  }, [categoriesList]);

  return (
    <CategoryContext.Provider
      value={{categoriesList, addCategory, resetCategoryList}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

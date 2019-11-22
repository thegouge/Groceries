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

  const addCategory = (categoryToAdd: {name: string; color: string}) => {
    const category: CategoryClass = {...categoryToAdd, id: 8};
    setCategoriesList([...categoriesList, category]);
  };

  const resetCategoryList = (newList: CategoryClass[]) => {
    setCategoriesList(newList);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc("Am6rTGvRXoLscCOIAVLe ")
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
  }, []);

  return (
    <CategoryContext.Provider
      value={{categoriesList, addCategory, resetCategoryList}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

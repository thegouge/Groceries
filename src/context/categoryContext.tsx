import React, {useState, useEffect} from "react";

import {firebase} from "../firebase";

import {useCategories} from "../hooks";
import {CategoryClass} from "../lib/interfaces";

interface catContextProps {
  categoriesList: CategoryClass[];
  addCategory: (category: any) => void;
  resetCategoryList: (newList: CategoryClass[]) => void;
}

const CategoryContext = React.createContext({} as catContextProps);
const CategoryProvider = (props: any) => {
  const {categoriesList, setCategoriesList} = useCategories();

  const userRef = firebase
    .firestore()
    .collection("users")
    .doc("Am6rTGvRXoLscCOIAVLe");

  const addCategory = (categoryToAdd: {name: string; color: string}) => {
    const category: CategoryClass = {...categoryToAdd, id: 8};
    setCategoriesList([...categoriesList, category]);
    userRef
      .collection("categories")
      .doc(category.name)
      .set(category);
  };

  const resetCategoryList = (newList: CategoryClass[]) => {
    setCategoriesList(newList);
    userRef.collection("categories");
  };

  return (
    <CategoryContext.Provider
      value={{categoriesList, addCategory, resetCategoryList}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

import React, {useState, useEffect} from "react";
import {Plugins} from "@capacitor/core";

import {CategoryClass} from "../lib/interfaces";
import {defaultCategoriesList} from "../lib/defaultData";

const {Storage} = Plugins;

interface catContextProps {
  categoriesList: CategoryClass[];
  addCategory: (category: any) => void;
  removeCategory: (id: number) => void;
  resetCats: () => void;
}

const CategoryContext = React.createContext({} as catContextProps);

const CategoryProvider = (props: any) => {
  // State
  const [categoriesList, setCategoriesList] = useState(defaultCategoriesList);

  // Methods
  const saveCategories = async (newList: CategoryClass[]) => {
    console.log("saving categories...");
    await Storage.set({
      key: "categories",
      value: JSON.stringify(newList),
    });
  };

  const loadCategories = async () => {
    console.log("loading categories...");
    const data = await Storage.get({key: "categories"});
    if (data.value === null) {
      console.log("null!");
      return categoriesList;
    } else {
      return JSON.parse(data.value);
    }
  };

  const addCategory = (categoryToAdd: {name: string; color: string}) => {
    const newList = [
      ...categoriesList,
      {...categoryToAdd, id: categoriesList.length},
    ];
    setCategoriesList(newList);
    saveCategories(newList);
  };

  const removeCategory = (idToRemove: number) => {
    console.log("removing category " + idToRemove);
    const newList = categoriesList.filter((cat) => cat.id !== idToRemove);

    setCategoriesList(newList);
    saveCategories(newList);
  };

  const resetCats = () => {
    setCategoriesList(defaultCategoriesList);
  };

  // Render
  useEffect(() => {
    loadCategories().then((data) => setCategoriesList(data));
  }, []);

  return (
    <CategoryContext.Provider
      value={{categoriesList, addCategory, removeCategory, resetCats}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

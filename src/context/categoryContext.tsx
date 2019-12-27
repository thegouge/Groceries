import React, {useState, useEffect} from "react";
import {Plugins} from "@capacitor/core";

import {CategoryClass} from "../lib/interfaces";
import {defaultCategoriesList} from "../lib/defaultData";

const {Storage} = Plugins;

interface catContextProps {
  categoriesList: CategoryClass[];
  addCategory: (category: any) => void;
}

const CategoryContext = React.createContext({} as catContextProps);
const CategoryProvider = (props: any) => {
  const [categoriesList, setCategoriesList] = useState([] as CategoryClass[]);

  const saveCategories = async () => {
    console.log("saving categories...");
    await Storage.set({
      key: "categories",
      value: JSON.stringify(categoriesList),
    });
  };

  const loadCategories = async () => {
    console.log("loading categories...");
    const data = await Storage.get({key: "categories"});
    if (data.value === null) {
      return defaultCategoriesList;
    } else {
      return JSON.parse(data.value);
    }
  };

  useEffect(() => {
    loadCategories().then((data) => setCategoriesList(data));
  }, []);

  const addCategory = (categoryToAdd: {name: string; color: string}) => {
    const nextId = categoriesList.length;
    const category: CategoryClass = {...categoryToAdd, id: nextId};

    setCategoriesList([...categoriesList, category]);
    saveCategories();
  };

  return (
    <CategoryContext.Provider value={{categoriesList, addCategory}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

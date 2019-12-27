import React, {useState, useEffect} from "react";

import {Plugins} from "@capacitor/core";

import {defaultCategoriesList} from "../lib/defaultData";

import {CategoryClass} from "../lib/interfaces";

const {Storage} = Plugins;

interface catContextProps {
  categoriesList: CategoryClass[];
  addCategory: (category: any) => void;
}

const CategoryContext = React.createContext({} as catContextProps);
const CategoryProvider = (props: any) => {
  const [categoriesList, setCategoriesList] = useState(defaultCategoriesList);

  const addCategory = (categoryToAdd: {name: string; color: string}) => {
    const nextId = categoriesList.length;
    const category: CategoryClass = {...categoryToAdd, id: nextId};

    setCategoriesList([...categoriesList, category]);
  };

  const saveCategories = () => {
    Storage.set({
      key: "categories",
      value: JSON.stringify(categoriesList),
    });
  };

  const loadCategories = async () => {
    const data = await Storage.get({key: "categories"});
    if (data.value === null) {
      return;
    } else {
      setCategoriesList(JSON.parse(data.value));
    }
  };

  return (
    <CategoryContext.Provider value={{categoriesList, addCategory}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

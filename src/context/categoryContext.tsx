import React, {useState, useEffect} from "react";
import {Plugins} from "@capacitor/core";

import {CategoryClass, ItemClass} from "../lib/interfaces";
import {defaultCategoriesList} from "../lib/defaultData";

const {Storage} = Plugins;

interface catContextProps {
  categoriesList: CategoryClass[];
  addCategory: (category: any) => void;
  addItem: (name: string, quantity: string, category: number) => void;
  removeCategory: (id: number) => void;
  resetCats: () => void;
  checkItem: (catIndex: number, itemIndex: number) => void;
  removeCatChecked: (catIndex: number) => void;
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
      {...categoryToAdd, id: categoriesList.length, list: []},
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

  const addItem = (name: string, quantity: string, category: number) => {
    const newList = categoriesList.slice();
    const cat = newList[category];
    cat.list.push({
      id: cat.list.length,
      name: name,
      quantity: quantity,
      isChecked: false,
    } as ItemClass);

    newList[category] = cat;
    setCategoriesList(newList);
    saveCategories(newList);
  };

  const checkItem = (catIndex: number, itemIndex: number) => {
    const newCatList = categoriesList.slice();
    const cat = newCatList[catIndex];
    cat.list[itemIndex] = Object.assign(cat.list[itemIndex], {isChecked: true});

    newCatList[catIndex] = cat;
    setCategoriesList(newCatList);
  };

  const removeCatChecked = (catIndex: number) => {
    const newCatList = categoriesList.slice();
    const cat = newCatList[catIndex];

    cat.list = cat.list.filter((item) => !item.isChecked);

    newCatList[catIndex] = cat;
    setCategoriesList(newCatList);
    saveCategories(newCatList);
  };

  // Render
  useEffect(() => {
    loadCategories().then((data) => setCategoriesList(data));
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categoriesList,
        addCategory,
        addItem,
        removeCategory,
        resetCats,
        checkItem,
        removeCatChecked,
      }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

import React, {useState, useEffect} from "react";

import {defaultCategoriesList} from "../lib/defaultData";

import {CategoryClass} from "../lib/interfaces";

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

  return (
    <CategoryContext.Provider value={{categoriesList, addCategory}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

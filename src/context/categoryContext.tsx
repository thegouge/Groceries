import React, {useState} from "react";

import {testList} from "../lib/defaultData";
import {CategoryClass} from "../lib/interfaces";

interface catContextProps {
  categoriesList: CategoryClass[];
  setCategoriesList: React.Dispatch<React.SetStateAction<CategoryClass[]>>;
}

const CategoryContext = React.createContext({} as catContextProps);
const CategoryProvider = (props: any) => {
  const [categoriesList, setCategoriesList] = useState(testList);

  return (
    <CategoryContext.Provider value={{categoriesList, setCategoriesList}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

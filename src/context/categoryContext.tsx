import React, {useState} from "react";

import {firebase} from "../firebase";

import {testList} from "../lib/defaultData";
import {CategoryClass} from "../lib/interfaces";

interface catContextProps {
  categoriesList: CategoryClass[];
  setCategoriesList: React.Dispatch<React.SetStateAction<CategoryClass[]>>;
}

const CategoryContext = React.createContext({} as catContextProps);
const CategoryProvider = (props: any) => {
  const [categoriesList, setCategoriesList] = useState(testList);

  const firebaseCall = firebase
    .firestore()
    .collection("categories")
    .get()
    .then((categorySnapshot) => {
      console.log(categorySnapshot);
      categorySnapshot.forEach((category) => {
        console.log(category.data());
      });
    });

  return (
    <CategoryContext.Provider value={{categoriesList, setCategoriesList}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

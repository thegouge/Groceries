import React, {useState, useEffect} from "react";

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

  useEffect(() => {
    firebase
      .firestore()
      .collectionGroup("categories")
      .where("userId", "==", 0)
      .get()
      .then((snapshot) => {
        console.log(snapshot);
        const catListToSend: any[] = [];

        snapshot.forEach((doc) => {
          console.log(doc.data());
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
    <CategoryContext.Provider value={{categoriesList, setCategoriesList}}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

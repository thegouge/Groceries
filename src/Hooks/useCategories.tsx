import {useState} from "react";

export const useCategories = () => {
  const [categoriesList, setCategoriesList] = useState();

  return [categoriesList, setCategoriesList];
};

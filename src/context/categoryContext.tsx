import React, {useState} from "react";

import {testList} from "../lib/defaultData";

const CategoryContext = React.createContext([testList, () => {}]);
const CategoryProvider = (props: any) => {
  const [categoriesList, setCategoriesList] = useState();

  return (
    <CategoryContext.Provider value={[categoriesList, setCategoriesList]}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export {CategoryContext, CategoryProvider};

import React, {useState} from "react";

import {itemList} from "../lib/defaultData";

const ItemContext = React.createContext([{}, () => {}]);
const ItemProvider = (props: any) => {
  const [itemsList, setItemsList] = useState(itemList);

  return (
    <ItemContext.Provider value={[itemsList, setItemsList]}>
      {props.children}
    </ItemContext.Provider>
  );
};

export {ItemContext, ItemProvider};

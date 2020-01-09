import React, {useContext, useState} from "react";
import {
  IonCard,
  IonCardHeader,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonReorderGroup,
} from "@ionic/react";
import {ItemReorderEventDetail} from "@ionic/core";

import {CategoryClass, ItemClass} from "../lib/interfaces";
import {reorder, add, trash} from "ionicons/icons";
import {ItemContext, CategoryContext} from "../context";
import {Item} from "./Item";

interface Props {
  category: CategoryClass;
  isCatReorder?: boolean;
  isItemReorder?: boolean;
}

const Category: React.FC<Props> = ({
  category,
  isCatReorder = false,
  isItemReorder = false,
}) => {
  // Context
  const {itemsList} = useContext(ItemContext);
  const {removeCategory} = useContext(CategoryContext);

  // State
  const [catItemsList, setCatItemsList] = useState(
    itemsList.filter((item) => item.catId === category.id)
  );

  // Methods
  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    setCatItemsList(event.detail.complete(catItemsList));
  };

  // Render
  const catItems = catItemsList.map((item: ItemClass) => (
    <Item
      key={item.name}
      item={item}
      isCatReorder={isCatReorder}
      isItemReorder={isItemReorder}
    />
  ));

  const currentIcon = isCatReorder ? (
    <IonIcon icon={reorder} size="large" />
  ) : (
    <IonIcon
      icon={trash}
      size="large"
      onClick={() => removeCategory(category.id)}
    />
  );

  return (
    <IonCard>
      <div
        style={{
          backgroundColor: category.color,
        }}>
        <div style={{borderBottom: "1px solid grey", clear: "both"}}>
          <IonCardHeader>
            <h3>{category.name}</h3>
            <div className="pull-right">{currentIcon}</div>
          </IonCardHeader>
        </div>
        <IonReorderGroup disabled={!isItemReorder} onIonItemReorder={doReorder}>
          {catItems}
        </IonReorderGroup>
        <IonItem
          key={`new-${category.name}-item`}
          routerLink={`/new/grocery/${category.id}`}>
          <IonIcon slot="start" icon={add} />
          <IonLabel>add new Item</IonLabel>
        </IonItem>
      </div>
    </IonCard>
  );
};

export default Category;

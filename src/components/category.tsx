import React, {useContext} from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonNote,
  IonReorder,
  IonIcon,
} from "@ionic/react";

import {CategoryClass, ItemClass} from "../lib/interfaces";
import {reorder, add} from "ionicons/icons";
import {ItemContext} from "../context";
import {Item} from "./Item";

interface Props {
  category: CategoryClass;
  removing: boolean;
  isCatReorder: boolean;
}

const Category: React.FC<Props> = ({category, removing, isCatReorder}) => {
  const {itemsList} = useContext(ItemContext);
  const catItems = itemsList
    .filter((item) => item.catId === category.id)
    .map((item: ItemClass) => (
      <Item item={item} removing={removing} isCatReorder={isCatReorder} />
    ));

  const categoryCard = (
    <IonCard>
      <div
        style={{
          backgroundColor: category.color,
        }}>
        <div style={{borderBottom: "1px solid grey"}}>
          <IonCardHeader>
            <IonCardTitle>
              {isCatReorder && <IonIcon icon={reorder} />}
              {category.name}
            </IonCardTitle>
          </IonCardHeader>
        </div>
        <IonList>
          {catItems}
          <IonItem
            key={`new-${category.name}-item`}
            routerLink={`/new/grocery/${category.id}`}>
            <IonIcon slot="start" icon={add} />
            <IonLabel>add new Item</IonLabel>
          </IonItem>
        </IonList>
      </div>
    </IonCard>
  );

  if (isCatReorder) {
    return <IonReorder>{categoryCard}</IonReorder>;
  }

  return categoryCard;
};

export default Category;

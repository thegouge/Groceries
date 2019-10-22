import React from "react";
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
} from "@ionic/react";

import {CategoryClass, Item} from "../lib/interfaces";

interface Props {
  category: CategoryClass;
}

const Category: React.FC<Props> = ({category}) => {
  const clickItem = (index: number) => {
    console.log("fire!");
    category.items[index].isChecked = !category.items[index].isChecked;
  };
  const catItems = category.items.map((item: Item, index: number) => (
    <IonItem
      key={`${category.name}:${item.name}`}
      onClick={(e) => clickItem(index)}>
      <IonCheckbox slot="start" checked={item.isChecked} />
      <IonLabel>
        <h1>{item.name}</h1>
        <IonNote>{item.quantity}</IonNote>
      </IonLabel>
    </IonItem>
  ));

  return (
    <IonReorder>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{category.name}</IonCardTitle>
        </IonCardHeader>
        <IonList>{catItems}</IonList>
      </IonCard>
    </IonReorder>
  );
};

export default Category;

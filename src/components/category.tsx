import React, {useState} from "react";
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
  checkItem: Function;
  removing: boolean;
}

const Category: React.FC<Props> = ({category, checkItem, removing}) => {
  const catItems = category.items.map((item: Item, index: number) => (
    <IonItem
      key={`${category.name}:${item.name}`}
      className={removing && item.isChecked ? "flying" : ""}>
      <IonCheckbox
        slot="start"
        onClick={() => checkItem(category.id, index)}
        checked={item.isChecked}
      />
      <IonLabel className={item.isChecked ? "checked" : ""}>
        <h2>{item.name}</h2>
        <IonNote>{item.quantity}</IonNote>
      </IonLabel>
    </IonItem>
  ));

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{category.name}</IonCardTitle>
      </IonCardHeader>
      <IonList>{catItems}</IonList>
    </IonCard>
  );
};

export default Category;

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
  IonIcon,
} from "@ionic/react";

import {CategoryClass, Item} from "../lib/interfaces";
import {reorder} from "ionicons/icons";

interface Props {
  category: CategoryClass;
  checkItem: Function;
  removing: boolean;
  isCatReorder: boolean;
}

const Category: React.FC<Props> = ({
  category,
  checkItem,
  removing,
  isCatReorder,
}) => {
  const catItems = category.items.map((item: Item, index: number) => (
    <IonItem
      key={`${category.name}:${item.name}`}
      className={removing && item.isChecked ? "flying" : ""}>
      <IonCheckbox
        slot="start"
        onClick={() => checkItem(category.id, index)}
        checked={item.isChecked}
        disabled={isCatReorder}
      />
      <IonLabel className={item.isChecked ? "checked" : ""}>
        <h2>{item.name}</h2>
        <IonNote>{item.quantity}</IonNote>
      </IonLabel>
    </IonItem>
  ));

  const categoryCard = (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {isCatReorder && <IonIcon icon={reorder} />}
          {category.name}
        </IonCardTitle>
      </IonCardHeader>
      <IonList>{catItems}</IonList>
    </IonCard>
  );

  if (isCatReorder) {
    return <IonReorder>{categoryCard}</IonReorder>;
  }

  return categoryCard;
};

export default Category;

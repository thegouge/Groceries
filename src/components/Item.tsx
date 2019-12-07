import React from "react";
import {ItemClass} from "../lib/interfaces";

interface Props {
  item: ItemClass;
  removing: boolean;
}

export const Item: React.FC<Props> = ({item, removing}) => {
  return (
    <IonItem
      key={`${item.catId}:${item.name}`}
      className={removing && item.isChecked ? "flying" : ""}>
      <IonCheckbox
        slot="start"
        onClick={() => checkItem(item.name)}
        checked={item.isChecked}
        disabled={isCatReorder}
      />
      <IonLabel className={item.isChecked ? "checked" : ""}>
        <h2>{item.name}</h2>
        <IonNote>{item.quantity}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

import React, {useContext} from "react";
import {ItemClass} from "../lib/interfaces";
import {ItemContext} from "../context";
import {IonItem, IonCheckbox, IonLabel, IonNote} from "@ionic/react";

interface Props {
  item: ItemClass;
  removing?: boolean;
  isCatReorder?: boolean;
}

export const Item: React.FC<Props> = ({
  item,
  removing = false,
  isCatReorder = false,
}) => {
  const {checkItem} = useContext(ItemContext);

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

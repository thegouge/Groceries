import React, {useContext, useState} from "react";
import {ItemClass} from "../lib/interfaces";
import {ItemContext} from "../context";
import {IonItem, IonCheckbox, IonLabel, IonNote} from "@ionic/react";

interface Props {
  item: ItemClass;
  removing: boolean;
  isCatReorder?: boolean;
}

export const Item: React.FC<Props> = ({
  item,
  removing,
  isCatReorder = false,
}) => {
  const {checkItem} = useContext(ItemContext);
  const [isChecked, toggleCheck] = useState(item.isChecked);

  const checkIt = () => {
    toggleCheck(!isChecked);
    checkItem(item.name);
  };

  return (
    <IonItem
      key={`${item.catId}:${item.name}`}
      className={removing && item.isChecked ? "flying" : ""}>
      <IonCheckbox
        slot="start"
        onClick={checkIt}
        checked={isChecked}
        disabled={isCatReorder}
      />
      <IonLabel className={isChecked ? "checked" : ""}>
        <h2>{item.name}</h2>
        <IonNote>{item.quantity}</IonNote>
      </IonLabel>
    </IonItem>
  );
};

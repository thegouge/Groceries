import React, {useContext, useState} from "react";
import {ItemClass} from "../lib/interfaces";
import {GlobalContext, CategoryContext} from "../context";
import {IonItem, IonCheckbox, IonLabel, IonNote} from "@ionic/react";
import {CSSTransition} from "react-transition-group";

interface Props {
  item: ItemClass;
  catIndex: number;
  isCatReorder?: boolean;
}

export const Item: React.FC<Props> = ({
  item,
  catIndex,
  isCatReorder = false,
}) => {
  // Context
  const {removing} = useContext(GlobalContext);
  const {checkItem} = useContext(CategoryContext);

  // State
  const [isChecked, toggleCheck] = useState(item.isChecked);

  // Methods
  const checkIt = () => {
    toggleCheck(!isChecked);
    checkItem(catIndex, item.id);
  };

  // Render
  return (
    <CSSTransition
      in={!removing || !item.isChecked}
      timeout={300}
      classNames={"item"}
      unmountOnExit>
      <IonItem key={`${item.name}`}>
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
    </CSSTransition>
  );
};

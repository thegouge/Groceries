import React, {useContext, useState} from "react";
import {ItemClass} from "../lib/interfaces";
import {ItemContext, GlobalContext} from "../context";
import {IonItem, IonCheckbox, IonLabel, IonNote} from "@ionic/react";
import {CSSTransition} from "react-transition-group";

interface Props {
  item: ItemClass;
  isCatReorder?: boolean;
}

export const Item: React.FC<Props> = ({item, isCatReorder = false}) => {
  const {checkItem} = useContext(ItemContext);
  const {removing} = useContext(GlobalContext);

  const [isChecked, toggleCheck] = useState(item.isChecked);

  const checkIt = () => {
    toggleCheck(!isChecked);
    checkItem(item.name);
  };

  return (
    <CSSTransition
      in={!removing || !item.isChecked}
      timeout={300}
      classNames={"item"}
      unmountOnExit>
      <IonItem key={`${item.catId}:${item.name}`}>
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

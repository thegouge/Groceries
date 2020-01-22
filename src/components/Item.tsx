import React, {useContext, useState} from "react";
import {ItemClass} from "../lib/interfaces";
import {ItemContext, GlobalContext} from "../context";
import {
  IonItem,
  IonCheckbox,
  IonLabel,
  IonNote,
  IonIcon,
  IonReorder,
} from "@ionic/react";
import {CSSTransition} from "react-transition-group";
import {reorder} from "ionicons/icons";

interface Props {
  item: ItemClass;
  index: number;
  catIndex: number;
  isCatReorder?: boolean;
  isItemReorder?: boolean;
}

export const Item: React.FC<Props> = ({
  item,
  isCatReorder = false,
  isItemReorder = false,
}) => {
  // Context
  const {removing} = useContext(GlobalContext);
  const {checkItem} = useContext(CategoryContext);

  // State
  const [isChecked, toggleCheck] = useState(item.isChecked);

  // Methods
  const checkIt = () => {
    toggleCheck(!isChecked);
    checkItem(catIndex, index);
  };

  // Render
  const itemRender = (
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
          disabled={isCatReorder || isItemReorder}
        />
        <IonLabel className={isChecked ? "checked" : ""}>
          <h2>{item.name}</h2>
          <IonNote>{item.quantity}</IonNote>
        </IonLabel>
        {isItemReorder && <IonIcon slot="end" icon={reorder} />}
      </IonItem>
    </CSSTransition>
  );

  return isItemReorder ? <IonReorder>{itemRender}</IonReorder> : itemRender;
};

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

import {CategoryClass, Item} from "../lib/interfaces";
import {reorder, add} from "ionicons/icons";
import {ItemContext} from "../context";

interface Props {
  category: CategoryClass;
  removing: boolean;
  isCatReorder: boolean;
}

const Category: React.FC<Props> = ({category, removing, isCatReorder}) => {
  const {itemList, checkItem} = useContext(ItemContext);
  const catItems = itemList
    .filter((item) => item.catId === category.id)
    .map((item: Item, index: number) => (
      <IonItem
        key={`${category.name}:${item.name}`}
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

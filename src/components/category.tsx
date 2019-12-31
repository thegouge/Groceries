import React, {useContext} from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonReorder,
  IonIcon,
  IonButton,
  IonButtons,
} from "@ionic/react";

import {CategoryClass, ItemClass} from "../lib/interfaces";
import {reorder, add, trash} from "ionicons/icons";
import {ItemContext, CategoryContext} from "../context";
import {Item} from "./Item";

interface Props {
  category: CategoryClass;
  isCatReorder?: boolean;
}

const Category: React.FC<Props> = ({category, isCatReorder = false}) => {
  const {itemsList} = useContext(ItemContext);
  const {removeCategory} = useContext(CategoryContext);

  const catItems = itemsList
    .filter((item) => item.catId === category.id)
    .map((item: ItemClass) => (
      <Item key={item.name} item={item} isCatReorder={isCatReorder} />
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
              {category.name}
              {isCatReorder && (
                <>
                  <IonIcon icon={reorder} />{" "}
                </>
              )}
            </IonCardTitle>
            <IonButton onClick={() => removeCategory(category.id)}>
              <IonIcon icon={trash} />
            </IonButton>
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

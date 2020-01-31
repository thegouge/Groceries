import React, {useContext} from "react";
import {
  IonCard,
  IonCardHeader,
  IonList,
  IonItem,
  IonLabel,
  IonReorder,
  IonIcon,
} from "@ionic/react";

import {CategoryClass, ItemClass} from "../lib/interfaces";
import {reorder, add, trash} from "ionicons/icons";
import {CategoryContext} from "../context";
import {Item} from "./Item";
import {useHistory} from "react-router";

interface Props {
  category: CategoryClass;
  removing: boolean;
  isCatReorder?: boolean;
}

const Category: React.FC<Props> = ({
  category,
  removing,
  isCatReorder = false,
}) => {
  // Context
  const {removeCategory} = useContext(CategoryContext);
  const history = useHistory();

  // Methods
  const removeSelf = (catId: number) => {
    history.push("/home");
    removeCategory(catId);
  };

  // Render
  const catItems = category.list.map((item: ItemClass, index) => (
    <Item
      key={item.name}
      item={item}
      index={index}
      isCatReorder={isCatReorder}
      catIndex={category.id}
      removing={removing}
    />
  ));

  const currentIcon = isCatReorder ? (
    <IonIcon icon={reorder} size="large" />
  ) : (
    <IonIcon
      icon={trash}
      size="large"
      onClick={() => removeSelf(category.id)}
    />
  );

  const categoryCard = (
    <IonCard>
      <div
        style={{
          backgroundColor: category.color,
        }}>
        <div style={{borderBottom: "1px solid grey", clear: "both"}}>
          <IonCardHeader>
            <h3>{category.name}</h3>
            <div className="pull-right">{currentIcon}</div>
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

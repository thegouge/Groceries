import React, {useContext, useState} from "react";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonCard,
  IonButtons,
  IonButton,
} from "@ionic/react";

import {CategoryContext, ItemContext} from "../context";
import {ErrorPage} from "./ErrorPage";
import {Item} from "../components/Item";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  const {categoriesList} = useContext(CategoryContext);
  const {itemsList, deleteCheckedItems} = useContext(ItemContext);

  const selectedCategory = categoriesList.find(
    (category) => `${category.id}` === match.params.id
  );

  const [catItemList, setCatItemList] = useState(
    selectedCategory
      ? itemsList.filter((item) => selectedCategory.id === item.catId)
      : undefined
  );

  if (!selectedCategory || !catItemList) {
    return <ErrorPage errType="no selected cat" />;
  }

  const removeChecked = () => {
    deleteCheckedItems();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle slot="start">{selectedCategory.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={removeChecked}>Remove Checked</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          {catItemList.map((item) => (
            <Item item={item} />
          ))}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(CategoryPage);

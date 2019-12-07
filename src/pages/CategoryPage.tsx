import React, {useContext} from "react";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonCard,
  IonItem,
} from "@ionic/react";

import {CategoryContext, ItemContext} from "../context";
import {ErrorPage} from "./ErrorPage";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  const {categoriesList} = useContext(CategoryContext);
  const {itemsList} = useContext(ItemContext);

  const selectedCategory = categoriesList.find(
    (category) => `${category.id}` === match.params.id
  );

  if (!selectedCategory) {
    return <ErrorPage errType="no selected cat" />;
  } else {
    const catItemList = itemsList
      .filter((item) => selectedCategory.id === item.catId)
      .map((item) => <IonItem></IonItem>);
  }

  if (!selectedCategory) {
    return <Redirect to="/home"></Redirect>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle slot="start">{selectedCategory.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard></IonCard>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(CategoryPage);

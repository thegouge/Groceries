import React, {useContext} from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonButtons,
  IonButton,
} from "@ionic/react";

import {CategoryContext, ItemContext, GlobalContext} from "../context";
import {ErrorPage} from "./ErrorPage";
import Category from "../components/Category";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  const {categoriesList} = useContext(CategoryContext);
  const {toggleRemoving} = useContext(GlobalContext);

  const selectedCategory = categoriesList.find(
    (category) => `${category.id}` === match.params.id
  );

  if (!selectedCategory) {
    return <ErrorPage errType="no selected cat" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle slot="start">{selectedCategory.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={toggleRemoving}>Remove Checked</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Category category={selectedCategory} />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(CategoryPage);

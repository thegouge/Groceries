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

import {CategoryContext, GlobalContext} from "../context";
import {ErrorPage} from "./ErrorPage";
import Category from "../components/Category";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  // Context
  const {categoriesList} = useContext(CategoryContext);
  const {toggleRemoving} = useContext(GlobalContext);

  // State
  const selectedCategory = categoriesList.find(
    (category) => `${category.id}` === match.params.id
  );

  // Render
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

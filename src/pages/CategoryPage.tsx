import React, {useContext} from "react";
import {withRouter, RouteComponentProps, Redirect} from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
} from "@ionic/react";

import {CategoryContext} from "../context";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  const {categoriesList} = useContext(CategoryContext);
  const selectedCategory = categoriesList.find(
    (category) => `${category.id}` === match.params.id
  );

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
      <IonContent>Hello from {selectedCategory.name}</IonContent>
    </IonPage>
  );
};

export default withRouter(CategoryPage);

import React from "react";
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

import {testList} from "../lib/defaultData";
import Category from "../components/category";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  const selectedCategory = testList.find(
    (category) => `${category.id}` === match.params.id
  );

  if (!selectedCategory) {
    return <div>How the hell are you even here?</div>;
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

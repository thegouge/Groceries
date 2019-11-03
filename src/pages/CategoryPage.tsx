import React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {IonPage, IonContent} from "@ionic/react";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => (
  <IonPage>
    <IonContent>Hello from {match.params.id}</IonContent>
  </IonPage>
);

export default withRouter(CategoryPage);

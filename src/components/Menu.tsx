import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {home} from "ionicons/icons";

import {testList} from "../lib/defaultData";

const Menu: React.FunctionComponent = () => (
  <IonMenu contentId="main">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem>
          <IonIcon icon={home} />
        </IonItem>
        {testList.map((category) => (
          <IonItem key={category.id}>
            <IonLabel>{category.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);

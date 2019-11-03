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
import {home, settings} from "ionicons/icons";

import {testList} from "../lib/defaultData";

const Menu: React.FunctionComponent = () => {
  // const navigateTo = (url) => {
  //   history.push(url);
  // };

  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/home">
              <IonIcon slot="start" icon={home} />
              <IonLabel>All</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {testList.map((category) => (
            <IonMenuToggle key={category.id}>
              <IonItem
                routerLink={`/category/${category.id}`}
                routerDirection="none">
                <IonLabel>{category.name}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/settings">
              <IonIcon slot="start" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);

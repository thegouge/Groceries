import React, {useContext, useState} from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonPage,
  IonItem,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonPopover,
  IonText,
  IonAlert,
} from "@ionic/react";
import {trash} from "ionicons/icons";
import {GlobalContext} from "../context";
import {RouteComponentProps} from "react-router";

const Settings: React.FC<RouteComponentProps> = (props) => {
  // Context
  const {reset} = useContext(GlobalContext);

  // State
  const [isDeleting, toggleDeleting] = useState(false);

  // Methods
  const handleReset = () => {
    toggleDeleting(true);
  };

  // Render
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem onClick={handleReset}>
            <IonAlert
              isOpen={isDeleting}
              onDidDismiss={() => toggleDeleting(false)}
              header={"WARNING!"}
              message={"Are you sure about this?"}
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                  cssClass: "secondary",
                  handler: () => {
                    console.log("Confirm Cancel");
                    toggleDeleting(false);
                  },
                },
                {
                  text: "Yes",
                  handler: () => {
                    reset()
                      .then(() => props.history.push("/home"))
                      .catch((err) => console.error(err));
                  },
                },
              ]}
            />
            <IonIcon slot="start" icon={trash} />
            <IonLabel>Delete Erryting</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;

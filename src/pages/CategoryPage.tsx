import React, {useContext, useState} from "react";
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
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
} from "@ionic/react";

import {CategoryContext, GlobalContext} from "../context";
import {ErrorPage} from "./ErrorPage";
import Category from "../components/Category";
import { options } from "ionicons/icons";

interface queryProps {
  id: string;
}

const CategoryPage = ({match}: RouteComponentProps<queryProps>) => {
  // Context
  const {categoriesList} = useContext(CategoryContext);
  const {setRemove} = useContext(GlobalContext);

  // State
  const selectedCategory = categoriesList.find(
    (category) => `${category.id}` === match.params.id
  );
  const [showOptions, setShowOptions] = useState(false);

  // Methods
  const removeCatChecked = () => {
    
  }

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
            {/* <IonIcon size="large" onClick={toggleDarkMode} icon={moon} /> */}
            <IonIcon
              size="large"
              onClick={() => setShowOptions(true)}
              icon={options}
            />
            <IonPopover
              isOpen={showOptions}
              onDidDismiss={(e) => setShowOptions(false)}>
              <IonList>
                <IonItem
                  button
                  onClick={() => {
                    removeCatChecked();
                    setShowOptions(false);
                  }}>
                  Delete Checked
                </IonItem>
                {/* 
                  // TODO: add a seperate reorder function for items
                <IonItem
                  button
                  onClick={() => {
                    toggleItemReorder();
                    setShowOptions(false);
                  }}>
                  Edit
                </IonItem> */}
              </IonList>
            </IonPopover>
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

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
import {options, returnLeft} from "ionicons/icons";

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
  const [itemReorder, setItemReorder] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Methods
  const removeCatChecked = () => {};

  const toggleItemReorder = () => {
    setItemReorder(!itemReorder);
  };

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
            {itemReorder && (
              <IonIcon
                size="large"
                onClick={toggleItemReorder}
                icon={returnLeft}
              />
            )}
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
                <IonItem
                  button
                  onClick={() => {
                    toggleItemReorder();
                    setShowOptions(false);
                  }}>
                  Reorder Items
                </IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Category category={selectedCategory} isItemReorder={itemReorder} />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(CategoryPage);

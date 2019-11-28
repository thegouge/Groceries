/* Core Framework Stuff */
import React, {useState, useContext} from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonReorderGroup,
  IonMenuButton,
  IonButtons,
  IonCard,
  IonIcon,
  IonLabel,
  IonItem,
} from "@ionic/react";
import {ItemReorderEventDetail} from "@ionic/core";
import {RouteComponentProps} from "react-router";
import {add} from "ionicons/icons";

/* Data Init */
import {CategoryClass} from "../lib/interfaces";
import {CategoryContext, ItemContext} from "../context";

/* Components */
import Category from "../components/category";

const Home: React.FC<RouteComponentProps> = (props) => {
  // Context
  const {categoriesList} = useContext(CategoryContext);
  const {itemList, deleteCheckedItems} = useContext(ItemContext);

  // State
  const [removing, setRemove] = useState(false);
  const [isCatReorder, setCatReorder] = useState(false);

  const removeChecked = () => {
    setRemove(true);
    setTimeout(() => {
      const reducedItemList = itemList.filter((item) => item.isChecked);
      deleteCheckedItems(reducedItemList);
      setRemove(false);
    }, 400);
  };

  const toggleCatReorder = () => {
    setCatReorder(!isCatReorder);
  };

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);
    event.detail.complete();
  };

  const categoryList = categoriesList.map((category: CategoryClass) => (
    <Category
      category={category}
      removing={removing}
      key={`${category.name}-card`}
      isCatReorder={isCatReorder}
    />
  ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle slot="start">Learning Ionic</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={removeChecked}>Remove Checked</IonButton>
            <IonButton onClick={toggleCatReorder}>Edit</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonReorderGroup onIonItemReorder={doReorder}>
          {categoryList}
          <IonCard routerLink={"/new/category/0"}>
            <IonItem>
              <IonIcon slot="start" icon={add} />
              <IonLabel>add new Category</IonLabel>
            </IonItem>
          </IonCard>
        </IonReorderGroup>
      </IonContent>
    </IonPage>
  );
};

export default Home;

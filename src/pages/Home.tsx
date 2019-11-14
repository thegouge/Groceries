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
} from "@ionic/react";
import {ItemReorderEventDetail} from "@ionic/core";
import {RouteComponentProps} from "react-router";

/* Data Init */
import {CategoryClass, Item} from "../lib/interfaces";
import {CategoryContext, ItemContext} from "../context";

/* Components */
import Category from "../components/category";

const Home: React.FC<RouteComponentProps> = (props) => {
  const {categoriesList, setCategoriesList} = useContext(CategoryContext);
  const {itemsList, setItemsList} = useContext(ItemContext);
  const [removing, setRemove] = useState(false);
  const [isCatReorder, setCatReorder] = useState(false);

  const addCat = () => {};

  const addItem = () => {};

  const checkItem = (itemId: number): void => {
    const index = itemsList.findIndex((item) => item.id === itemId);
    itemsList[index].isChecked = !itemsList[index].isChecked;
  };

  const removeChecked = () => {
    setRemove(true);
    setTimeout(() => {
      const reducedItemsList = itemsList.filter((item) => !item.isChecked);
      setItemsList(reducedItemsList);
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
      checkItem={checkItem}
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
        </IonReorderGroup>
      </IonContent>
    </IonPage>
  );
};

export default Home;

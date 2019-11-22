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
import {CategoryClass} from "../lib/interfaces";
import {CategoryContext, ItemContext} from "../context";

/* Components */
import Category from "../components/category";

const Home: React.FC<RouteComponentProps> = (props) => {
  const {categoriesList} = useContext(CategoryContext);
  const {itemList, resetItemList} = useContext(ItemContext);
  const [removing, setRemove] = useState(false);
  const [isCatReorder, setCatReorder] = useState(false);

  const checkItem = (itemId: number): void => {
    const index = itemList.findIndex((item) => item.id === itemId);
    itemList[index].isChecked = !itemList[index].isChecked;
  };

  const removeChecked = () => {
    setRemove(true);
    setTimeout(() => {
      const reducedItemList = itemList.filter((item) => !item.isChecked);
      resetItemList(reducedItemList);
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

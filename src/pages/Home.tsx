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
import {CategoryContext} from "../context";

/* Components */
import Category from "../components/category";

const Home: React.FC<RouteComponentProps> = (props) => {
  const {categoriesList, setCategoriesList} = useContext(CategoryContext);
  const [removing, setRemove] = useState(false);
  const [isCatReorder, setCatReorder] = useState(false);

  const addCat = () => {};

  const addItem = () => {};

  const checkItem = (cat: number, i: number): void => {
    console.log(cat);
    const oldItem = categoriesList[cat].items[i];
    const newItem = [...categoriesList];
    newItem[cat].items.splice(i, 1, {
      ...oldItem,
      isChecked: !oldItem.isChecked,
    });
    setCategoriesList(newItem);
  };

  const removeChecked = () => {
    setRemove(true);
    setTimeout(() => {
      setCategoriesList(
        categoriesList.map((category: CategoryClass) => {
          return {
            ...category,
            items: category.items.filter((item: Item) => {
              return !item.isChecked;
            }),
          };
        })
      );
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

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonReorderGroup,
  IonMenuButton,
  IonButtons,
} from "@ionic/react";
import {ItemReorderEventDetail} from "@ionic/core";
import React, {useState, useContext} from "react";
import {add} from "ionicons/icons";
import {RouteComponentProps} from "react-router";
import {CategoryClass, Item} from "../lib/interfaces";
import Category from "../components/category";
import {CategoryContext} from "../context/categoryContext";

const Home: React.FC<RouteComponentProps> = (props) => {
  const [catList, setCatList] = useContext(CategoryContext);
  const [removing, setRemove] = useState(false);
  const [isCatReorder, setCatReorder] = useState(false);

  console.log(catList);

  const addCat = () => {};

  const addItem = () => {};

  const checkItem = (cat: number, i: number): void => {
    const oldItem = catList[cat].items[i];
    const newItem = [...catList];
    newItem[cat].items.splice(i, 1, {
      ...oldItem,
      isChecked: !oldItem.isChecked,
    });
    setCatList(newItem);
  };

  const removeChecked = () => {
    setRemove(true);
    setTimeout(() => {
      setCatList(
        catList.map((category: CategoryClass) => {
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

  const categoryList = catList.map((category: CategoryClass) => (
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

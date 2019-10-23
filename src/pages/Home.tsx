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
} from "@ionic/react";
import React, {useState} from "react";
import {add} from "ionicons/icons";
import {RouteComponentProps} from "react-router";
import {CategoryClass, Item} from "../lib/interfaces";
import Category from "../components/category";
import {testList} from "../lib/data";

const Home: React.FC<RouteComponentProps> = (props) => {
  const [catList, setCatList] = useState(testList);

  const [removing, setRemove] = useState(false);

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

  const categoryList = catList.map((category: CategoryClass) => (
    <Category
      checkItem={checkItem}
      category={category}
      removing={removing}
      key={`${category.name}-card`}
    />
  ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Learning Ionic</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonButton slot="end" onClick={removeChecked}>
            Remove Checked
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {categoryList}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => props.history.push("/new")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;

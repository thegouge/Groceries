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

const Home: React.FC<RouteComponentProps> = (props) => {
  const [catList, setCatList] = useState([
    {
      id: 0,
      name: "Category Name",
      items: [
        {
          id: 0,
          name: "create Idea",
          quantity: "run idea by Brandy",
          isChecked: false,
        },
      ],
    },
    {
      id: 1,
      name: "Bulk Items",
      items: [
        {
          id: 0,
          name: "Rice",
          quantity: "2lbs",
          isChecked: false,
        },
        {
          id: 1,
          name: "Peanut Butter",
          quantity: "All",
          isChecked: false,
        },
      ],
    },
  ]);

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
  };

  const categoryList = catList.map((category: CategoryClass) => (
    <Category
      checkItem={checkItem}
      category={category}
      key={`${category.name}-card`}
    />
  ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Learning Ionic</IonTitle>
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

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import React, {useState} from "react";
import {add} from "ionicons/icons";
import {RouteComponentProps} from "react-router";
import {CategoryClass} from "../lib/interfaces";
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
  const categoryList = catList.map((category: CategoryClass) => (
    <Category category={category} key={`${category.name}-card`} />
  ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Learning Ionic</IonTitle>
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

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import React, {useState} from "react";
import {CategoryClass} from "../lib/interfaces";

import {testList} from "../lib/data";

const NewItem: React.FC = (props) => {
  const catList = testList;
  const [isItem, setItem] = useState(true);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [catIndex, setCatIndex] = useState("");

  let newForm;
  if (isItem) {
    const categoryOptions = catList.map((category) => (
      <IonSelectOption key={category.name} value={category.id}>
        {category.name}
      </IonSelectOption>
    ));
    newForm = (
      <form>
        <IonItem>
          <IonLabel position="floating">Grocery Name</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Quantity</IonLabel>
          <IonInput></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Category</IonLabel>
          <IonSelect
            interface="popover"
            onIonChange={(e) => console.log(e.target)}>
            {categoryOptions}
            <IonSelectOption value="new">New Category</IonSelectOption>
          </IonSelect>
        </IonItem>
      </form>
    );
  } else {
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Create a New...</IonTitle>
        </IonToolbar>
        <IonSegment onIonChange={(e) => setItem(!isItem)}>
          <IonSegmentButton value="grocery" checked={isItem}>
            <IonLabel>Grocery</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="category" checked={!isItem}>
            <IonLabel>Category</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent>{newForm}</IonContent>
    </IonPage>
  );
};
export default NewItem;

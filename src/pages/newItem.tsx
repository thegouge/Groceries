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
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import React, {useState} from "react";

import {testList} from "../lib/defaultData";

const NewItem: React.FC = (props) => {
  const catList = testList;
  const [isItem, setItem] = useState(true);
  const [input, setInput] = useState({});

  const addInput = () => {
    console.log("form submit!");
  };

  const newForm = isItem ? (
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
          {catList.map((category) => (
            <IonSelectOption key={category.name} value={category.id}>
              {category.name}
            </IonSelectOption>
          ))}
          <IonSelectOption value="new">New Category</IonSelectOption>
        </IonSelect>
      </IonItem>
    </form>
  ) : (
    <form>
      <IonItem>
        <IonLabel position="floating">Category Name</IonLabel>
        <IonInput></IonInput>
      </IonItem>
    </form>
  );

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
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          {newForm}
          <IonItem>
            <IonButton slot="end" onClick={addInput}>
              Submit
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default NewItem;

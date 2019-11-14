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
  IonModal,
} from "@ionic/react";
import React, {useState, useContext} from "react";

import Colors from "../components/Colors";
import {CategoryContext} from "../context";

const NewItem: React.FC = (props) => {
  const {categoriesList} = useContext(CategoryContext);
  const [addType, setAddType] = useState("grocery");
  const [input, setInput] = useState({});
  const [newCat, setNewCat] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [catColor, setCatColor] = useState("#FFFFFF");

  const updateAddType = (e: any) => {
    setAddType(e.detail.value);
  };

  const addInput = () => {
    console.log("form submit!");
  };

  let newForm;

  switch (addType) {
    case "grocery":
      const updateCategorySelection = (e: any) => {
        setNewCat(e.detail.value);
      };

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
            <IonLabel position="floating">Category</IonLabel>
            <IonSelect
              interface="popover"
              onIonChange={updateCategorySelection}>
              {categoriesList.map((category) => (
                <IonSelectOption key={category.name} value={category.id}>
                  {category.name}
                </IonSelectOption>
              ))}
              <IonSelectOption value="new">Make new Category</IonSelectOption>
            </IonSelect>
          </IonItem>
        </form>
      );
      break;

    case "category":
      // TODO: add an icon picker for Category
      // const renderedList: any[] = [];
      // for (let icon in iconList) {
      //   const renderedIcon: any = iconList[icon];
      //   renderedList.push(renderedIcon);
      // }

      newForm = (
        <form>
          <IonItem>
            <IonLabel position="floating">Category Name</IonLabel>
            <IonInput></IonInput>
          </IonItem>

          <IonItem>
            <div
              className="color-picker-interior"
              style={{backgroundColor: catColor}}
              onClick={() => setShowModal(true)}>
              <IonLabel>Category Color</IonLabel>
              <IonInput readonly={true}>{catColor}</IonInput>
            </div>
            <IonModal isOpen={showModal}>
              <Colors catColor={catColor} setCatColor={setCatColor} />
              <IonButton onClick={() => setShowModal(false)}>
                Close Modal
              </IonButton>
            </IonModal>
          </IonItem>
        </form>
      );
      break;

    default:
      newForm = (
        <IonCard>
          <IonTitle>Something has gone wrong...</IonTitle>
        </IonCard>
      );
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
        <IonSegment onIonChange={updateAddType}>
          <IonSegmentButton value="grocery" checked={addType === "grocery"}>
            <IonLabel>Grocery</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="category" checked={addType === "category"}>
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

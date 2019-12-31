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
import {CategoryContext, ItemContext} from "../context";
import {CategoryClass} from "../lib/interfaces";
import {withRouter, RouteComponentProps} from "react-router-dom";

interface QueryProps {
  type: string;
  initial: string;
}

const NewItem: React.FC<RouteComponentProps<QueryProps>> = ({
  match,
  history,
}) => {
  // Context
  const {categoriesList, addCategory} = useContext(CategoryContext);
  const {addItem} = useContext(ItemContext);

  // state
  const [addType, setAddType] = useState(match.params.type);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [category, setCategory] = useState(parseInt(match.params.initial));
  const [catColor, setCatColor] = useState("#FFFFFF");
  const [showModal, setShowModal] = useState(false);

  const resetState = () => {
    setAddType(match.params.type);
    setName("");
    setQuantity("0");
    setCategory(0);
    setCatColor("#FFFFFF");
  };

  const addInput = () => {
    console.log(`new ${addType}!`);
    switch (addType) {
      case "category":
        addCategory({
          name: name,
          color: catColor,
        } as CategoryClass);
        break;

      case "grocery":
        addItem({
          name: name,
          quantity: quantity,
          category: category,
        });
        break;

      default:
        break;
    }

    resetState();
    history.push("/home");
  };

  let newForm;

  switch (addType) {
    case "grocery":
      newForm = (
        <form>
          <IonItem>
            <IonLabel position="floating">Grocery Name</IonLabel>
            <IonInput
              onIonChange={(e: any) => setName(e.detail.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Quantity</IonLabel>
            <IonInput
              onIonChange={(e: any) => setQuantity(e.detail.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Category</IonLabel>
            <IonSelect
              interface="popover"
              value={category}
              onIonChange={(e: any) => setCategory(parseInt(e.detail.value))}>
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
            <IonInput
              onIonChange={(e: any) => setName(e.detail.value)}></IonInput>
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
        <IonSegment onIonChange={(e: any) => setAddType(e.detail.value)}>
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
export default withRouter(NewItem);

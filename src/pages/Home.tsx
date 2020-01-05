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
  IonCard,
  IonIcon,
  IonLabel,
  IonItem,
  IonReorder,
  IonPopover,
  IonList,
} from "@ionic/react";
import {ItemReorderEventDetail} from "@ionic/core";
import {RouteComponentProps} from "react-router";
import {add, options, moon} from "ionicons/icons";

/* Data Init */
import {CategoryClass} from "../lib/interfaces";
import {CategoryContext, ItemContext, GlobalContext} from "../context";

/* Components */
import Category from "../components/Category";

const Home: React.FC<RouteComponentProps> = () => {
  // Context
  const {categoriesList} = useContext(CategoryContext);
  const {removeChecked} = useContext(ItemContext);
  const {toggleDarkMode} = useContext(GlobalContext);

  // State
  const [isCatReorder, setCatReorder] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleCatReorder = () => {
    setCatReorder(!isCatReorder);
  };

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    console.log("Dragged from index", event.detail.from, "to", event.detail.to);
    event.detail.complete();
  };

  // Render
  const categoryList = categoriesList.map((category: CategoryClass) => {
    const catCard = (
      <Category
        category={category}
        key={`${category.name}-card`}
        isCatReorder={isCatReorder}
      />
    );
    if (isCatReorder) {
      return <IonReorder>{catCard}</IonReorder>;
    } else {
      return catCard;
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonButtons slot="end">
            <IonIcon size="large" onClick={toggleDarkMode} icon={moon} />
            <IonIcon
              size="large"
              onClick={() => setShowOptions(true)}
              icon={options}
            />
            <IonPopover
              isOpen={showOptions}
              onDidDismiss={(e) => setShowOptions(false)}
              >
              <IonList>
                <IonItem button onClick={() => {removeChecked(); setShowOptions(false);}}>
                  Delete Checked
                </IonItem>
                <IonItem button onClick={() => {toggleCatReorder(); setShowOptions(false);}}>
                  Edit
                </IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonReorderGroup disabled={!isCatReorder} onIonItemReorder={doReorder}>
          {categoryList}
          <IonCard routerLink={"/new/category/0"}>
            <IonItem>
              <IonIcon slot="start" icon={add} />
              <IonLabel>add new Category</IonLabel>
            </IonItem>
          </IonCard>
        </IonReorderGroup>
      </IonContent>
    </IonPage>
  );
};

export default Home;

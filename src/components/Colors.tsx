import React, {Dispatch, SetStateAction} from "react";
import {
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonCard,
  IonLabel,
  IonItem,
  IonInput,
} from "@ionic/react";

import {colorList} from "../lib/defaultData";

interface Props {
  catColor: string;
  setCatColor: Dispatch<SetStateAction<string>>;
}

const Colors: React.FC<Props> = ({catColor, setCatColor}) => {
  const setSelectedColor = (color: string) => {
    console.log(color);
    setCatColor(color);
  };

  const mapThroughColors = (colorArray: string[]) => {
    return colorArray.map((color: string) => (
      <IonCol
        style={{cursor: "pointer", backgroundColor: color}}
        onClick={() => setSelectedColor(color)}>
        &nbsp;
      </IonCol>
    ));
  };

  const colorGrid = colorList.map((array) => (
    <IonRow>{mapThroughColors(array)}</IonRow>
  ));

  return (
    <div>
      <IonHeader>
        <h3>Color Picker</h3>
      </IonHeader>
      <IonGrid>{colorGrid}</IonGrid>
      <div className="color" style={{backgroundColor: catColor}}>
        <IonInput
          readonly={true}
          value={catColor}
          debounce={500}
          minlength={7}
          maxlength={7}
          onIonChange={(e: any) => setCatColor(e.detail.value)}></IonInput>
      </div>
    </div>
  );
};

export default Colors;

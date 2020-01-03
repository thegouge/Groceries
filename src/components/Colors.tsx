import React from "react";
import {IonGrid, IonRow, IonCol, IonHeader, IonInput} from "@ionic/react";

import {colorList} from "../lib/defaultData";

interface Props {
  catColor: string;
  setCatColor: (newColor: string) => void;
}

const Colors: React.FC<Props> = ({catColor, setCatColor}) => {
  // Methods
  const setSelectedColor = (color: string) => {
    setCatColor(color);
  };

  // Render
  const mapThroughColors = (colorArray: string[], row: number) => {
    return colorArray.map((color: string, index) => (
      <IonCol
        key={row + "-" + index}
        style={{
          cursor: "pointer",
          backgroundColor: color,
        }}
        onClick={() => setSelectedColor(color)}>
        &nbsp;
      </IonCol>
    ));
  };

  const colorGrid = colorList.map((array, index) => (
    <IonRow key={index}>{mapThroughColors(array, index)}</IonRow>
  ));

  return (
    <div>
      <IonHeader>
        <h4>Color Picker</h4>
      </IonHeader>
      <IonGrid>{colorGrid}</IonGrid>
      <div
        className="color"
        style={{
          backgroundColor: catColor,
        }}>
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

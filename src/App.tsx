import React from "react";
import {Redirect, Route} from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Home from "./pages/Home";
import NewItem from "./pages/newItem";

import Menu from "./components/Menu";

import "./global.css";
import CategoryPage from "./pages/CategoryPage";
import Settings from "./pages/Settings";
import {add} from "ionicons/icons";

import "./App.css";
import {CategoryProvider} from "./context/categoryContext";
import {ItemProvider} from "./context/itemContext";

const App: React.FC = (props) => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <CategoryProvider>
          <ItemProvider>
            <Menu />
            <IonRouterOutlet id="main">
              <Route exact path="/home" component={Home} />
              <Route exact path="/new" component={NewItem} />
              <Route exact path="/category/:id" component={CategoryPage} />
              <Route exact path="/settings" component={Settings} />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
          </ItemProvider>
        </CategoryProvider>
      </IonSplitPane>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton routerLink="/new">
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </IonReactRouter>
  </IonApp>
);

export default App;

import React from "react";
import {Redirect, Route} from "react-router-dom";
import {IonApp, IonRouterOutlet, IonSplitPane} from "@ionic/react";
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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane id="nav" contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route exact path="/home" component={Home} />
          <Route exact path="/new" component={NewItem} />
          <Route exact path="/category/:id" component={CategoryPage} />
          <Route exact path="/settings" component={Settings} />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;

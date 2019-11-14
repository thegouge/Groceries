import React, {useState} from "react";
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

/* Pages */
import Home from "./pages/Home";
import NewItem from "./pages/newItem";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import Settings from "./pages/Settings";

/* Seperate Components */
import Menu from "./components/Menu";

/* Context */
import {CategoryProvider} from "./context";
import {ItemProvider} from "./context";

/* custom Styles */
import "./global.css";
import {add} from "ionicons/icons";

const App: React.FC = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
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
                <Route exact path="/login" component={Login} />
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
};
export default App;

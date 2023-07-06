import { useEffect } from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import PrivatePage from "./pages/private";
import PublicPage from "./pages/public";

import { useAuth } from "./stores";

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
import "./theme/utils.css";

setupIonicReact();

const App: React.FC = () => {
  const authState = useAuth();

  const { validUserAction } = authState;

  useEffect(() => {
    if (authState.getUserToken) {
      validUserAction();
    } else {
      authState.setAuthLoading(false);
    }
  }, []);

  return (
    <IonApp>
      {authState.getAuthLoading ? (
        <p>Authentication is in-progress...</p>
      ) : authState.getIsLoggedIn ? (
        <PrivatePage />
      ) : (
        <PublicPage />
      )}
    </IonApp>
  );
};

export default App;

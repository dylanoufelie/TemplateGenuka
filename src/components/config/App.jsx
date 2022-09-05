import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Auth from "../../context/Auth";
import hasAuthenticated from "../../services/AuthApi";
// import { store } from "../../settings/DataSlice";
import { persistor, store } from "../../settings/Store";
import Check from "./Check";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>

      <Provider store={store}>

        <PersistGate persistor={persistor}>
          <Check />
        </PersistGate>

      </Provider>

    </Auth.Provider>
  )
}


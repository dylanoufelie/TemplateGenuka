import { useState } from "react";
import { Provider } from "react-redux";
import Auth from "../../context/Auth";
import hasAuthenticated from "../../services/AuthApi";
import { store } from "../../settings/DataSlice";
import Check from "./Check";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());

  return (
    <Auth.Provider value={{ isAuthenticated, setIsAuthenticated }}>

      <Provider store={store}>
        <Check />
      </Provider>
      
    </Auth.Provider>
  )
}


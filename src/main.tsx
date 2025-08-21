import "./index.css";
import "leaflet/dist/leaflet.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { StrictMode } from "react";
import './i18n'
import { AuthContextProvider } from "./contexts/AuthContext";


const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);

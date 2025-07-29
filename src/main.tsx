import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { StrictMode } from "react";


const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

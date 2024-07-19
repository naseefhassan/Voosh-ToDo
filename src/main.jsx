import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StoreTask } from "./Context/StoreTask.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreTask>
        <App />
      </StoreTask>
    </BrowserRouter>
  </React.StrictMode>
);

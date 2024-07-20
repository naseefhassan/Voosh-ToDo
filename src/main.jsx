import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StoreTaskProvider } from "./Context/StoreTask.jsx";
import { DragDropProvider } from "./Context/DragDropContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreTaskProvider>
        <DragDropProvider>
          <App />
        </DragDropProvider>
      </StoreTaskProvider>
    </BrowserRouter>
  </React.StrictMode>
);

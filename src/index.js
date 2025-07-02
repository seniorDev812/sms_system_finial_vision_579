import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import GlobalProvider from './context/index.js'; // or './context/index'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
        <App />
    </GlobalProvider>
  </React.StrictMode>
);

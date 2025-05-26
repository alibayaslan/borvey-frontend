import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./media.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const store = configureStore();

export const state = store.getState();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import reducer from "./reducers/ticket-list-reducer";
import rootReducer from "./reducers/index";
import { Provider } from "react-redux";

// const store = configureStore(rootReducer);
const store = configureStore({ reducer: rootReducer });
store.subscribe(() => console.log(store.getState()));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {console.log(`store:`)}
      {console.log(store)}
      <App />
    </Provider>
  </React.StrictMode>
);

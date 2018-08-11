import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/appContainer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import configureStore from "./ducks/configureStore";

const store = configureStore({});

var mountNode = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  mountNode
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/appContainer.js";
import { Provider } from "react-redux";
import { createStore } from "redux";
import wsApp from "./ducks/wsduck.js";

const store = createStore(wsApp);

var mountNode = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  mountNode
);

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import classes from "./index.module.scss";

ReactDOM.render(
  <React.StrictMode>
    <App className={classes.app} />
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import classes from "./index.module.scss";

import ReactGA from "react-ga4";

ReactGA.initialize("G-5D7DF3HWJY");
ReactGA.send("pageview");




ReactDOM.render(
  <React.StrictMode>
    <App className={classes}/>
  </React.StrictMode>,
  document.getElementById("root")
);

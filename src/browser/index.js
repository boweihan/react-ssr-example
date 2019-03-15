import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";

// hydrate tells React that we've already created the markup
// on the server and it should just preserve it / attach any needed
// markup on the client side
hydrate(<App data="AppData" />, document.getElementById("app"));

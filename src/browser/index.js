import React from "react";
import { hydrate } from "react-dom";
import App from "../shared/App";
import { BrowserRouter } from "react-router-dom";

// hydrate tells React that we've already created the markup
// on the server and it should just preserve it / attach any needed
// markup on the client side
hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app"),
);

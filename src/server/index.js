import express from "express";
import cors from "cors";
// takes a React element and renders it to a string
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import React from "react";
// serializing javascript so that we can pass data from the client to the server
import serialize from "serialize-javascript";

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const name = "AppData";
  const markup = renderToString(<App data={name} />);

  // server the entire HTML document here including the script imports
  // for the client side react application
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>react-ssr-example</title>
        <script src="/bundle.js" defer></script>
        <script>window.__INITIAL_DATA__ = ${serialize(name)}</script>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});

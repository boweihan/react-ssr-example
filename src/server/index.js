import express from "express";
import cors from "cors";
// takes a React element and renders it to a string
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import React from "react";
// serializing javascript so that we can pass data from the client to the server
import serialize from "serialize-javascript";
import { fetchPopularRepos } from "../shared/api";
import { StaticRouter, matchPath } from "react-router-dom";
import routes from "../shared/routes";

const app = express();

app.use(cors());

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then(data => {
      const context = { data };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>,
      );

      res.send(`
     <!DOCTYPE html>
     <html>
       <head>
         <title>React SSR</title>
         <script src="/bundle.js" defer></script>
         <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
       </head>

       <body>
         <div id="app">${markup}</div>
       </body>
     </html>
   `);
    })
    .catch(next);
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});

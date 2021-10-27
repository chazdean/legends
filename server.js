// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
const loginRoutes = require("./routes/login");
const mapsRoutes = require("./routes/maps");
const pinsRoutes = require("./routes/pins");
const pinRoutes = require("./routes/pin");
const mapRoutes = require("./routes/map");
const newMapRoutes = require("./routes/newMap");

// Mount all resource routes
app.use("/", loginRoutes(db));
app.use("/maps", mapsRoutes(db));
app.use("/pins", pinsRoutes(db));
app.use("/pin", pinRoutes(db));
app.use("/map", mapRoutes(db));
app.use("/newmap", newMapRoutes(db));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

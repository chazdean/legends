/*
 * All routes for pins are defined here
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Render the map details page with list of pins and the google API map
  router.get("/pins/:map_id", (req, res) => {

    res.render("pins");
  });

  return router;
};

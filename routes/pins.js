/*
 * All routes for pins are defined here
 */

const express = require('express');
const router  = express.Router();
const { getUserWithId } = require('../databaseHelpers/userQueries');
const { getPinsForMap } = require('../databaseHelpers/pinsQueries');


module.exports = (db) => {

  //Render the map details page with list of pins and the google API map
  router.get("/:map_id", (req, res) => {
    const map_id = req.params.map_id;

    getPinsForMap(map_id, db)
      .then((pinsArray) => {
        console.log(pinsArray);
        res.render("pins");
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

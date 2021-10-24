/*
 * All routes for pins are defined here
 */

const express = require('express');
const router  = express.Router();
const { getUserWithId } = require('../databaseHelpers/userQueries');
const {
  getPinsForMap,
  getMapDetails
 } = require('../databaseHelpers/pinsQueries');


module.exports = (db) => {

  //Render the map details page with list of pins and the google API map
  router.get("/:map_id", (req, res) => {
    const user_id = req.session.user_id;
    const map_id = req.params.map_id;

    getMapDetails(map_id, db)
    .then((mapData) => {

      getPinsForMap(map_id, db)
      .then((pinsArray) => {
        const templateVars = {
          user_id,
          mapData,
          pinsArray
        };
        console.log(templateVars);
        res.render("pins", templateVars);
      });

    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

  });

  return router;
};

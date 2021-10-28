/*
 * All routes for /pins are defined here
 */

const express = require('express');
const router  = express.Router();
const { config } = require('../config');
const {
  getPinsForMap,
  getMapDetails,
  addNewPinToMap
 } = require('../databaseHelpers/pinsQueries');


module.exports = (db) => {

  //Render the map details page with list of pins and the google API map
  router.get("/:map_id", (req, res) => {
    const user = req.session.user_id;
    const userName = req.session.user_name;
    const map_id = req.params.map_id;

    getMapDetails(map_id, db)
    .then((mapData) => {

      getPinsForMap(map_id, db)
      .then((pinsArray) => {
        const templateVars = {
          config,
          user,
          userName,
          mapData,
          pinsArray
        };
        res.render("pins", templateVars);
      });

    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });

  });

  //Add new pin to the database and gives it a map_id of the current map, after the database query is complete, redirect back to the pins details page for the same map
  router.post("/:map_id", (req, res) => {
    const user = req.session.user_id;
    const map_id = req.params.map_id;

    addNewPinToMap({ ...req.body, map_id, creator_id: user }, db)
      .then(() => {
        res.redirect(`./${map_id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  return router;
};

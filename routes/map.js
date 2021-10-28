/*
 * All routes for individual map features are defined here
 */

const express = require('express');
const router  = express.Router();
const moment = require('moment');
const {
  getMap,
  updateMap,
  deleteMap
} = require('../databaseHelpers/mapQueries')


module.exports = (db) => {

  //Show individual map details
  router.get("/:map_id", (req, res) => {
    const user = req.session.user_id;
    const userName = req.session.user_name;

    getMap(req.params['map_id'], db)
      .then(mapData => {
        templateVars = {
          map: mapData,
          user,
          userName,
          moment: moment
        };
        res.render("updateMap", templateVars)
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Update details about map to database on form submit
  router.post("/:map_id", (req, res) => {
    const user_id = req.session.user_id;
    const map_id = req.params.map_id;

    updateMap({ ...req.body, map_id }, db)
      .then(result => {
        res.redirect(`../../maps/${user_id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Delete map from database on button press
  router.post("/delete/:map_id", (req, res) => {
    const user_id = req.session.user_id;

    deleteMap(req.params['map_id'], db)
      .then(() => {
        res.redirect(`../../maps/${user_id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

/*
 * All routes for individual map features are defined here
 */

const express = require('express');
const router  = express.Router();
const {
  getMap,
  updateMap,
  deleteMap
} = require('../databaseHelpers/mapQueries')


module.exports = (db) => {

  //Show individual map details
  router.get("/:map_id", (req, res) => {
    getMap(req.params['map_id'], db)
      .then(result => {
        res.render("updateMap", { map: result, user: req.session.user_id })
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Update details about map to database on form submit
  router.post("/:map_id", (req, res) => {
    user_id = req.session.user_id;

    updateMap(req.params['map_id'], req.body, db)
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
    user_id = req.session.user_id;

    deleteMap(req.params['map_id'], db)
      .then(result => {
        res.redirect(`../../maps/${user_id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

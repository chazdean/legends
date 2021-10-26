/*
 * All routes for individual map features are defined here
 */

const express = require('express');
const router  = express.Router();
const {
  getMap,
  addMap,
  updateMap,
  deleteMap
} = require('../databaseHelpers/mapQueries')
const {
  getUserMaps
} = require('../databaseHelpers/mapsQueries')

module.exports = (db) => {

  //Show individual map details
  router.get("/:map_id", (req, res) => {
    getMap(req.params['map_id'], db)
      .then(result => {
        console.log(result)
        res.render("updateMap", { map: result, user: req.session.user_id })
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Update details about map to database on form submit
  router.post("/:map_id", (req, res) => {

    updateMap(req.params['map_id'], req.body, db)
      .then(result => {
        console.log(result)
        //res.redirect(`../maps/${req.params['map_id']}`);
        //res.render("maps", { map: result })

        getUserMaps(req.session.user_id, db)
        .then(result => {
          console.log(result)
          res.render("myMaps", { maps: result, user: req.session.user_id });
        });

      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Delete map from database on button press
  router.post("/delete/:map_id", (req, res) => {
    deleteMap(req.params['map_id'], db)
      .then(result => {
        console.log(result)

        getUserMaps(req.session.user_id, db)
        .then(result => {
          console.log(result)
          res.render("myMaps", { maps: result, user: req.session.user_id });
        });

      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

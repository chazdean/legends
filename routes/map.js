/*
 * All routes for individual map features are defined here
 */

const express = require('express');
const { func } = require('joi');
const router  = express.Router();
const {
  getMap,
  addMap,
  updateMap,
  deleteMap
} = require('../databaseHelpers/mapQueries')

module.exports = (db) => {

  //Show individual map details
  router.get("/:map_id", (req, res) => {
    getMap(req.params['map_id'], db)
      .then(result => {
        console.log(result)
        //res.render("maps", { map: result })
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
        //res.render("maps", { map: result })
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Delete map from database on button press
  router.delete("/:map_id", (req, res) => {
    deleteMap(req.params['map_id'], db)
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Renders a form page for user to create brand new map
  router.get("/new", (req, res) => {
    res.render("newMap");
  });

  //Inserts the new map into the database, render the pins page for the new map
  router.post("/new", (req, res) => {
    addMap(req.body, db)
      .then(result => {
        console.log(result)
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

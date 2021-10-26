/*
 * All routes for new maps
 */

const express = require('express');
const router  = express.Router();
const {
  getMap,
  addMap,
  updateMap,
  deleteMap
} = require('../databaseHelpers/mapQueries')

module.exports = (db) => {

  //Renders a form page for user to create brand new map
  router.get("/", (req, res) => {
    res.render("newMap");
  });

  //Inserts the new map into the database, render the pins page for the new map
  router.post("/", (req, res) => {
    console.log("looks like we made it...")
    console.log(req.session.user_id, req.body);
    addMap(req.session.user_id, req.body, db)
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

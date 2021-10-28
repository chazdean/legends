/*
 * All routes for new maps
 */

const express = require('express');
const router  = express.Router();
const { addMap } = require('../databaseHelpers/mapQueries')

module.exports = (db) => {

  //Renders a form page for user to create brand new map
  router.get("/", (req, res) => {
    const user = req.session.user_id;
    const userName = req.session.user_name;

    res.render("newMap", { user, userName });
  });

  //Inserts the new map into the database, render the pins page for the new map
  router.post("/", (req, res) => {
    const user_id = req.session.user_id;

    addMap({ ...req.body, creator_id: user_id }, db)
      .then(newMap => {
        console.log(newMap);
        res.redirect(`../pins/${newMap.id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

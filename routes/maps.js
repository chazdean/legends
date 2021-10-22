/*
 * All routes for maps are defined here
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Render the main maps page
  router.get("/", (req, res) => {
    // database functions to query for a list of 20 maps

    res.render("maps", { templateVars });
  });

  //Render individual users maps
  router.get("/:user_id", (req, res) => {
    // database functions to query for all individual user maps
    // based on user_id

    res.render("maps", { templateVars });
  });

  //Render the current users maps
  router.get("/favorites/:user_id", (req, res) => {
    // database functions to query for favorite maps of the current user

    res.render("maps", { templateVars });
  });

  router.post("/favorites/:user_id", (req, res) => {
    //database function to add the current map as a favorite map for the user

    res.redirect("/maps"); //redirect back to the favorites map list
  });

  return router;
};

/*
 * All routes for maps are defined here
 */

const express = require('express');
const { func } = require('joi');
const router  = express.Router();

module.exports = (db) => {

  //Render the main maps page
  router.get("/", (req, res) => {
    // database functions to query for a list of 20 maps

    const getMaps = function(limit) {
    const sql = `
      SELECT *
      FROM maps
      LIMIT $1
      `;
    const params = [limit]

     return db.query(sql, params)
        .then(res => res.rows)
        .catch(err => console.log(err.message));
    }

    getMaps(20).then((maps) => {
      console.log("ALL MAPS", maps)
      res.render("maps");
    });
  });

  //Render individual users maps
  router.get("/:user_id", (req, res) => {
    // database functions to query for all individual user maps
    // based on user_id

    res.render("maps");
  });

  //Render the current users maps
  router.get("/favorites/:user_id", (req, res) => {
    // database functions to query for favorite maps of the current user

    res.render("maps");
  });

  router.post("/favorites/:user_id", (req, res) => {
    //database function to add the current map as a favorite map for the user

    res.redirect("/maps"); //redirect back to the favorites map list
  });

  return router;
};

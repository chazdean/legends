/*
 * All routes for maps are defined here
 */

const express = require('express');
const { func } = require('joi');
const router  = express.Router();
const {
  getMaps,
  getUserMaps,
  getFavouriteMaps
} = require('../databaseHelpers/mapsQueries')

module.exports = (db) => {

  //Render the main maps page
  router.get("/", (req, res) => {
    // database functions to query for a list of 20 maps
    getMaps(db)
      .then(result => {
        console.log(result)
        console.log(req.session.user_id)
        res.render("maps", { maps: result, user: req.session.user_id })
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Render individual users maps
  router.get("/:user_id", (req, res) => {
    // database functions to query for all individual user maps
    // based on user_id
    getUserMaps(req.params['user_id'], db)
      .then(result => {
        console.log(result)
        res.render("maps", { maps: result, user: req.session.user_id });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Render the current users maps
  router.get("/favorites/:user_id", (req, res) => {
    // database functions to query for favorite maps of the current user
    getFavouriteMaps(req.params['user_id'], db)
    .then(result => {
      console.log(result)
      res.render("maps", { maps: result, user: req.session.user_id });
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });


  /* POST FAVOUTITES ROUTE UNDER CONSTRUCTION
    router.post("/favorites/:user_id", (req, res) => {
    //database function to add the current map as a favorite map for the user
    addFavouriteMap(req.params['user_id'], )
    res.redirect("/maps"); //redirect back to the favorites map list
  }); */

  return router;
};

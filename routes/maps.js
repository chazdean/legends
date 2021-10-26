/*
 * All routes for maps are defined here
 */

const express = require('express');
const router  = express.Router();
const moment = require('moment');
const {
  getMaps,
  getUserMaps,
  getFavoriteMaps
} = require('../databaseHelpers/mapsQueries')

module.exports = (db) => {

  //Render the main maps page
  router.get("/", (req, res) => {
    getMaps(db)
      .then(result => {
        console.log(result)
        res.render("maps", {
          maps: result,
          user: req.session.user_id,
          moment: moment
        });
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
        res.render("mymaps", {
          maps: result,
          user: req.session.user_id,
          moment: moment
        });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //Render the current users maps
  router.get("/favorites/:user_id", (req, res) => {
    // database functions to query for favorite maps of the current user
    getFavoriteMaps(req.params['user_id'], db)
    .then(result => {
      console.log(result)
      res.render("favmaps", {
        maps: result,
        user: req.session.user_id,
        moment: moment
      });
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

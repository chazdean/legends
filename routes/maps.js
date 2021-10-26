/*
 * All routes for maps are defined here
 */

const express = require('express');
const router  = express.Router();
const moment = require('moment');
const {
  getMaps,
  getUserMaps,
  getFavoriteMaps,
  getFavoriteMapRelationships,
  addFavoriteMap
} = require('../databaseHelpers/mapsQueries')

module.exports = (db) => {

  //Render the main maps page
  router.get("/", (req, res) => {
    user = req.session.user_id;

    getMaps(db)
    .then(mapData => {

      getFavoriteMapRelationships(user, db)
      .then((favData) => {
        const templateVars = {
          maps: mapData,
          favList: favData,
          user,
          moment: moment
        };
        res.render("maps", templateVars);
      });
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  //Render maps that the user has created
  router.get("/:user_id", (req, res) => {

    getUserMaps(req.params.user_id, db)
      .then( result => {
        console.log(result);
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

  //Render the current users favorite maps
  router.get("/favorites/:user_id", (req, res) => {
    getFavoriteMaps(req.params.user_id, db)
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

  router.post("/favorites/:map_id", (req, res) => {
    user_id = req.session.user_id;
    map_id = req.params.map_id;

    addFavoriteMap(user_id, map_id, db)
    .then((result) => {
      console.log('added map to favorites', result);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  return router;
};

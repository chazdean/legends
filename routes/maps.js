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
  addFavoriteMap,
  removeFavoriteMap
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
    user = req.params.user_id;

    getUserMaps(user, db)
    .then((mapData) => {
      const templateVars = {
        maps: mapData,
        user,
        moment: moment
      };
      res.render("mymaps", templateVars);
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  //Render the current users favorite maps
  router.get("/favorites/:user_id", (req, res) => {
    user = req.session.user_id;

    getFavoriteMaps(user, db)
    .then(mapData => {

      getFavoriteMapRelationships(user, db)
      .then((favData) => {
        const templateVars = {
          maps: mapData,
          favList: favData,
          user,
          moment: moment
        };
        res.render("favmaps", templateVars);
      });
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  //Add or update the users favorite map in the db
  router.post("/favorites/:map_id", (req, res) => {
    user_id = req.session.user_id;
    map_id = req.params.map_id;

    addFavoriteMap(user_id, map_id, db)
    .then((result) => {
      console.log('added map to favorites', result);  // REMOVE
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  // Post to the db and change the favorite status to false
  router.post("/favorites/remove/:map_id", (req, res) => {
    user_id = req.session.user_id;
    map_id = req.params.map_id;

    removeFavoriteMap(user_id, map_id, db)
    .then((result) => {
      console.log('removed map from favorites - set active to false', result);  // REMOVE
    })
    .catch(e => {
      console.error(e);
      res.send(e);
    });
  });

  return router;
};

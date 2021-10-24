/*
 * All routes for map are defined here
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

  router.get("/:map_id", (req, res) => {

  });


  router.post("/:map_id", (req, res) => {

  });

  router.delete("/:map_id", (req, res) => {

  });

  router.get("/new", (req, res) => {

  });

  router.post("/new", (req, res) => {

  });

  return router;
};

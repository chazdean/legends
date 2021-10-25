/*
 * All routes for /pin are defined here
 */

const express = require('express');
const router  = express.Router();
const {
  getPinDetails,
  updatePin,
  deletePin
 } = require('../databaseHelpers/pinQueries');


module.exports = (db) => {

  //Render the pin details on the update pin page
  router.get("/:pin_id", (req, res) => {
    const user = req.session.user_id;
    const pin_id = req.params.pin_id;

    getPinDetails(pin_id, db)
      .then((pinData) => {
        const templateVars = {
          user,
          pinData
        };
        res.render("update_pin", templateVars);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });

  });

  //Update some information about the current pin in the database
  router.post("/:pin_id", (req, res) => {
    const pin_id = req.params.pin_id;

    updatePin({ ...req.body, pin_id }, db)
      .then((data) => {
        res.redirect(`../pins/${data.map_id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //delete the pin from the database
  router.post("/delete/:pin_id", (req, res) => {
    const pin_id = req.params.pin_id;

    deletePin(pin_id, db)
      .then((data) => {
        res.redirect(`../../pins/${data.map_id}`);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

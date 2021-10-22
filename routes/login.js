/*
 * All routes for user login, register & logout are in this file
 */

const express = require('express');
const router  = express.Router();
const {
  getUserWithEmail,
  authenticateUser
} = require('../databaseHelpers/userQueries')

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login", { error: null });
  });

  router.get("/register", (req, res) => {
    res.render("register", { error: null });
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Checking first for empty fields
    if (!email || !password) {
      return res.render("login", {error: "Please enter a valid email and password"})
    }

    // Query the db for the users email
    getUserWithEmail(email, db)
      .then(userData => {
        if (!userData) {
          return res.render("login", { error: "Sorry, this email does not exist" });
        }

        if(!authenticateUser(password, userData)) {
          return res.render("login", { error: "Sorry, this password is incorrect" });
        }

        // Email and password are correct - set cookie and switch to maps home page
        req.session.user_id = userData.id;
        res.redirect("/maps");
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/register", (req, res) => {
    //add new user to database
    //set the session cookie

    res.redirect("/maps"); //build routes/maps.js
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};

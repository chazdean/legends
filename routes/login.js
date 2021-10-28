/*
 * All routes for user login, register & logout are in this file
 */

const express = require('express');
const router  = express.Router();
const {
  getUserWithEmail,
  authenticateUser,
  addNewUser
} = require('../databaseHelpers/userQueries')

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login", { error: null });
  });

  router.get("/register", (req, res) => {
    res.render("register", { error: null });
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;

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

        // Email and password are correct - set the user-cookie and switch to maps home page
        req.session.user_id = userData.id;
        req.session.user_name = userData.name;
        res.redirect("/maps");
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    // Checking first for empty fields
    if (!name || !email || !password) {
      return res.render("register", {error: "Please enter a valid name, email and password"})
    }

    // Check if the user already exists in the db
    getUserWithEmail(email, db)
      .then(data => {
        if (data) {
          return res.render("login", { error: "This email already exists, please login!" });
        }

        // If the user is new, add user to the db and log them in by setting the session-cookie
        addNewUser(req.body, db)
          .then((userData) => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.name;
            res.redirect("/maps");
          })
          .catch(e => {
            console.error(e);
            res.send(e);
          });
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};

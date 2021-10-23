// Helpers for user database queries

const bcrypt = require('bcrypt');

/**
 * getUserWithEmail
 * @param { string } email from the form body
 * @param {{ Pool }} db
 * @returns { Promise } containing an object of all the users credentials, null if no user exists
 */
const getUserWithEmail = function(email, db) {
  const queryParams = [email];
  const queryString = `SELECT * FROM users WHERE email = $1;`;

  return db.query(queryString, queryParams)
    .then(result => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * getUserWithId
 * @param { string } user_id from the cookie-session
 * @param {{ Pool }} db
 * @returns { Promise } containing and object with all the users credentials
 */
 const getUserWithId = function(user_id, db) {
  const queryParams = [user_id];
  const queryString = `SELECT * FROM users WHERE id = $1;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * authenticateUser
 * @param { string } password from the form body
 * @param {{ Object }} dbCred user credentials from the database
 * @returns true if password for user matches the db, false if not
 */
const authenticateUser = function(password, dbCred) {
  if (!bcrypt.compareSync(password, dbCred.password)) {
    return false;
  }
  return true;
};

/**
 * addNewUser
 * @param { Object } clientData the entire form body object
 * @param { Pool } db
 * @returns { Promise } containing and object of only the newly added user data
 */
const addNewUser = function(clientData, db) {
  const queryParams = [
    clientData.name,
    clientData.email,
    bcrypt.hashSync(clientData.password, 10)
  ];
  const queryString = `
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  authenticateUser,
  addNewUser
};



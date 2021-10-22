// Helpers for user database queries

const bcrypt = require('bcrypt');

/**
 *
 * @param { string } email from the form body
 * @param {{ Pool }} db
 * @returns { Object } containing the users credentials, null if no user exists
 */
const getUserWithEmail = function(email, db) {
  console.log('this is running');
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
 *
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

module.exports = {
  getUserWithEmail,
  authenticateUser
}

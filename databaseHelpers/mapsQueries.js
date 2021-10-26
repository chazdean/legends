// Helpers for user database queries
const {
  getUserWithId
} = require('../databaseHelpers/userQueries')

/**
 * getMaps
 * @param { Pool } db
 * @returns { Promise } containing an object with 20 maps in database
 */
const getMaps = function(db) {
  const queryString = `
    SELECT maps.*, users.name as creator_name
    FROM maps
    JOIN users ON creator_id = users.id
    LIMIT 20
    `;

  return db.query(queryString)
    .then(result => {
      return result.rows
    })
    .catch(err => {
      console.log(err.message)
    });
};

/**
 * getUserMaps
 * @param { string } user_id from the url paramater
 * @param { Pool } db
 * @returns { Promise } containing an object with user assigned maps
 */
const getUserMaps = function(userID, db) {
  const queryParams = [userID]
  const queryString = `
    SELECT maps.*, users.name as creator_name
    FROM maps
    JOIN users ON maps.creator_id = users.id
    WHERE creator_id = $1
    ORDER BY maps.id;
    `;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows
    })
    .catch(err => {
      console.log(err.message)
    });
};

/**
 * getFavouriteMaps
 * @param { string } user_id from the url paramater
 * @param { Pool } db
 * @returns { Promise } containing an object with user favourited maps
 */
const getFavouriteMaps = function(userID, db) {
  const queryParams = [userID]
  const queryString = `
    SELECT *
    FROM favmaps_users
    JOIN users ON user_id = users.id
    JOIN maps ON map_id = maps.id
    WHERE user_id = $1 AND active = TRUE
    `;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows
    })
    .catch(err => {
      console.log(err.message)
    });
};

/**
 * addFavouriteMap
 * @param { string } user_id from the url paramater
 * @param { string } map_id from the dataTag element
 * @param { Pool } db
 * @returns { Promise } containing an object with newly added favourite map
 */
const addFavouriteMap = function(userID, db) {
  const queryParams = [userID]
  const queryString = `
    INSERT INTO
      favmaps_users (user_id, map_id, active)
    VALUES
      ($1, $2, true)
    RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.log(err.message)
    });
};

module.exports = {
  getMaps,
  getUserMaps,
  getFavouriteMaps
};

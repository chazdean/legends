// Helpers for maps lists database queries

/**
 * getMaps
 * @param { Pool } db
 * @returns { Promise } containing an object with 20 maps in database
 */
const getMaps = function(db) {
  const queryString = `
    SELECT
      maps.*,
      count(pins.*) AS pin_number,
      users.name as creator_name
    FROM
      maps
      LEFT JOIN pins ON pins.map_id = maps.id
      JOIN users ON users.id = maps.creator_id
    GROUP BY
      maps.id,
      users.name
    ORDER BY
      maps.date_created DESC
    LIMIT 20;`;

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
 * @param { string } user_id from the url parameter
 * @param { Pool } db
 * @returns { Promise } containing an object with user assigned maps
 */
const getUserMaps = function(userID, db) {
  const queryParams = [userID]
  const queryString = `
    SELECT *
    FROM maps
    JOIN users ON maps.creator_id = users.id
    WHERE creator_id = $1
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
 * getFavoriteMaps
 * @param { string } user_id from the url parameter
 * @param { Pool } db
 * @returns { Promise } containing an object with users favorite maps
 */
const getFavoriteMaps = function(userID, db) {
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
 *
 * @param { string } user_id
 * @param { Pool } db
 * @returns promise object containing a list of user favorite relations and their active status
 */
const getFavoriteMapRelationships = function(user_id, db) {
  const queryParams = [user_id]
  const queryString = `
    SELECT
      *
    FROM
      favmaps_users
    WHERE
      user_id = $1;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows
    })
    .catch(err => {
      console.log(err.message)
    });
};

/**
 * addFavoriteMap
 * @param { string } user_id
 * @param { string } map_id
 * @param { Pool } db
 * no return
 */
 const addFavoriteMap = function(user_id, map_id, db) {
  const queryParams = [user_id, map_id]
  const queryString = `
    INSERT INTO
      favmaps_users (user_id, map_id)
    VALUES
      ($1, $2)
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
  getMaps,
  getUserMaps,
  getFavoriteMaps,
  getFavoriteMapRelationships,
  addFavoriteMap
};

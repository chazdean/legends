// Helpers for pins database queries

/**
 * getPinsForMap
 * @param { string } map_id
 * @param { Pool } db
 * @returns Promise object containing all of the pins data for the given map_id
 */
const getPinsForMap = function(map_id, db) {
  const queryParams = [map_id];
  const queryString = `
    SELECT
      pins.*, users.name AS creator
    FROM
      pins
      JOIN users ON pins.creator_id = users.id
    WHERE
      pins.map_id = $1
    ORDER BY
      pins.title;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};


/**
 * getMapDetails
 * @param { string } map_id
 * @param { Pool } db
 * @returns promise with a single row of object data, only the information for the given map_id
 */
const getMapDetails = function(map_id, db) {
  const queryParams = [map_id];
  const queryString = `
    SELECT
      maps.*,
      users.name AS map_creator
    FROM
      maps
      JOIN users ON maps.creator_id = users.id
    WHERE
      maps.id = $1;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * addNewPinToMap
 * @param { Object } newPinData contains all the form data to insert the new pin into database
 * @param { Pool } db
 * @returns a promise object containing the newly added pin data
 */
const addNewPinToMap = function(newPinData, db) {
  const queryParams = [
    newPinData.title,
    newPinData.description,
    newPinData.img_url,
    newPinData.lat,
    newPinData.lng,
    newPinData.map_id,
    newPinData.creator_id
  ];
  const queryString = `
    INSERT INTO pins (
      title,
      description,
      img_url,
      lat,
      lng,
      map_id,
      creator_id,
      date_created
    )
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, now()::date)
    RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = {
  getPinsForMap,
  getMapDetails,
  addNewPinToMap
};

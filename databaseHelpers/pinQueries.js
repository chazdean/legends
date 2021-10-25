// Helpers for pins database queries

/**
 * getPinDetails
 * @param { string } pin_id
 * @param { Pool } db
 * @returns { Promise } containing an object with details for only one pin
 */
const getPinDetails = function(pin_id, db) {
  const queryParams = [pin_id];
  const queryString = `
    SELECT
      *
    FROM
      pins
    WHERE
      id = $1;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * updatePin
 * @param { Object } newPinData
 * @param { Pool } db
 * @returns { Promise } containing an object with details for the newly updated pin
 */
 const updatePin = function(newPinData, db) {
  const queryParams = [
    newPinData.title,
    newPinData.description,
    newPinData.img_url,
    newPinData.lat,
    newPinData.lng,
    newPinData.map_id,
  ];
  const queryString = `
    SELECT
      *
    FROM
      pins
    WHERE
      id = $1;`;  // NEED TO BUILD THIS WITH CONDITIONS

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * deletePin
 * @param { string } pin_id
 * @param { Pool } db
 * @returns { Promise } containing object info of the pin that was just deleted
 */
const deletePin = function(pin_id, db) {
  const queryParams = [pin_id];
  const queryString = `DELETE FROM pins WHERE id = $1 RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};


module.exports = {
  getPinDetails,
  updatePin,
  deletePin
};

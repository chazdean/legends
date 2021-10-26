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
      pins.*,
      users.name AS creator
    FROM
      pins
      JOIN users ON pins.creator_id = users.id
    WHERE
      pins.id = $1;`;

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
  const queryParams = [];
  let queryString = `UPDATE pins SET `;

  if (newPinData.title) {
    queryParams.push(`${newPinData.title}`);
    queryString += `title = $${queryParams.length}`;
  }

  if (newPinData.description) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newPinData.description}`);
    queryString += `description = $${queryParams.length}`;
  }

  if (newPinData.img_url) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newPinData.img_url}`);
    queryString += `img_url = $${queryParams.length}`;
  }

  if (newPinData.lat) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newPinData.lat}`);
    queryString += `lat = $${queryParams.length}`;
  }

  if (newPinData.lng) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newPinData.lng}`);
    queryString += `lng = $${queryParams.length}`;
  }

  queryParams.push(`${newPinData.pin_id}`);
  queryString += ` WHERE id = $${queryParams.length} RETURNING *;`

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

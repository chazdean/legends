// Helpers for pins database queries

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

const getMapDetails = function(map_id, db) {
  const queryParams = [map_id];
  const queryString = `
    SELECT
      *
    FROM
      maps
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


const addNewPinToMap = function(newPinData, db) {
  console.log("obj passed into the query", newPinData)
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

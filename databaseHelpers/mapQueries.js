
const getMap = function(mapID, db) {
  const queryParams = [mapID]
  const queryString = `
    SELECT *
    FROM maps
    WHERE maps.id = $1;
    `;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.log(err.message)
    });
};

const addMap = function(mapData, db) {
  const queryString = `
    INSERT INTO
      maps (creator_id, title, description, city, province, country, date_created)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;

  return db.query(queryString)
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.log(err.message)
    });
};

const updateMap = function(mapID, mapData, db) {
  const queryParams = [mapID, mapData.title, mapData.description, mapData.city, mapData.province, mapData.country]
  const queryString = `
  UPDATE maps
  SET title = $2, description = $3, city = $4, province = $5, country = $6
  WHERE creator_id = $1
  RETURNING *;
    `;

  return db.query(queryString)
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.log(err.message)
    });
};

const deleteMap = function(mapID, db) {
  const queryString = `
  DELETE FROM maps
  WHERE map.id = $
  RETURNING *;
    `;

  return db.query(queryString)
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.log(err.message)
    });
};

module.exports = {
  getMap,
  addMap,
  updateMap,
  deleteMap
};

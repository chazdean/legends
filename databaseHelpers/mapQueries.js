
const getMap = function(mapID, db) {
  const queryParams = [mapID]
  const queryString = `
    SELECT maps.*, users.name as creator_name
    FROM maps
    JOIN users ON creator_id = users.id
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

const addMap = function(userID, mapData, db) {
  const date = new Date();
  const queryParams = [userID, mapData.title, mapData.description, mapData.city, mapData.province, mapData.country, mapData.map_img_url, date]
  const queryString = `
    INSERT INTO
      maps (creator_id, title, description, city, province, country, img_map_url, date_created)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `;

  return db.query(queryString, queryParams)
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
  WHERE maps.id = $1
  RETURNING *;
    `;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0]
    })
    .catch(err => {
      console.log(err.message)
    });
};

const deleteMap = function(mapID, db) {
  console.log("hey")
  const queryParams = [mapID]
  const queryString = `
  DELETE FROM maps
  WHERE maps.id = $1
  RETURNING *;
    `;

  return db.query(queryString, queryParams)
    .then(result => {
      console.log("THIS GOT DELETED", result.rows[0])
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

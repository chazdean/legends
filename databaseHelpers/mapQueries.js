// Helpers for /map related database queries

const getMap = function(mapID, db) {
  const queryParams = [mapID]
  const queryString = `
    SELECT maps.*, users.name as creator_name
    FROM maps
    JOIN users ON creator_id = users.id
    WHERE maps.id = $1;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

const addMap = function(mapData, db) {
  const queryParams = [
    mapData.creator_id,
    mapData.title,
    mapData.description,
    mapData.city,
    mapData.province,
    mapData.country,
    mapData.map_img_url
  ];
  const queryString = `
    INSERT INTO
      maps (creator_id, title, description, city, province, country, map_img_url, date_created)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, now()::date)
    RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

const updateMap = function(newMapData, db) {
  const queryParams = [];
  let queryString = `UPDATE maps SET `;

  if (newMapData.title) {
    queryParams.push(`${newMapData.title}`);
    queryString += `title = $${queryParams.length}`;
  }

  if (newMapData.description) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newMapData.description}`);
    queryString += `description = $${queryParams.length}`;
  }

  if (newMapData.city) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newMapData.city}`);
    queryString += `city = $${queryParams.length}`;
  }

  if (newMapData.province) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newMapData.province}`);
    queryString += `province = $${queryParams.length}`;
  }

  if (newMapData.country) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newMapData.country}`);
    queryString += `country = $${queryParams.length}`;
  }

  if (newMapData.map_img_url) {
    if (queryParams.length > 0) {
      queryString += `, `
    }
    queryParams.push(`${newMapData.map_img_url}`);
    queryString += `map_img_url = $${queryParams.length}`;
  }

  queryParams.push(`${newMapData.map_id}`);
  queryString += ` WHERE id = $${queryParams.length} RETURNING *;`

  console.log(queryString);
  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message)
    });
};

const deleteMap = function(mapID, db) {
  console.log("hey")
  const queryParams = [mapID]
  const queryString = `DELETE FROM maps WHERE maps.id = $1 RETURNING *;`;

  return db.query(queryString, queryParams)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

module.exports = {
  getMap,
  addMap,
  updateMap,
  deleteMap
};

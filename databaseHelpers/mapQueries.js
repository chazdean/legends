
const getMap = function(userID, db) {
  const queryString = `
    SELECT *
    FROM maps
    WHERE creator_id = $1;
    `;

  return db.query(queryString)
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

const updateMap = function(mapData, db) {
  const queryString = `
  UPDATE maps
  SET title = $1, description = $2, city = $3, province = $4, country = $5
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

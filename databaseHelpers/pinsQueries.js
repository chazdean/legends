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


module.exports = {
  getPinsForMap
};

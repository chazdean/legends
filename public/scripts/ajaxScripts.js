// Client facing scripts for adding favorite maps

const addFavorite = function(map_id) {
  return $.ajax({
    method: "POST",
    url: `/maps/favorites/${map_id}`
  });
}

const removeFavorite = function(map_id) {
  return $.ajax({
    method: "POST",
    url: `/maps/favorites/remove/${map_id}`
  });
}

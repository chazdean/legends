// Client facing scripts for adding favorite maps

const addFavorite = function(map_id) {
  return $.ajax({
    method: "POST",
    url: `/maps/favorites/${map_id}`
  });
}

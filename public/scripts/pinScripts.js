// pinScripts file is attached to the pins.ejs view

$(() => {

  const $showMap = $("#show-google-map");
  const $mapContainer = $("#map-container");
  const $map = $("#map");

  $showMap.on("click", function() {
    $mapContainer.append(createMapElement());
    $showMap.slideToggle("fast");
  })


});

const createMapElement = function() {
  return $(`
      <script>
        function initMap() {
          let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: { lat: 43.68447906611417 ,lng: -79.37427641186511 }
          });
        }
      </script>
      <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvNdYt8Paq0IGUi3mIzvT_58_i8yvJVO4&callback=initMap">
      </script>
  `);
}


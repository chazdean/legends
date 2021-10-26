// listeners for the maps/mymaps/favmaps views - this script is added to these files only views/maps.ejs, views/mymaps.ejs, views/favmaps.ejs

$(() => {

  $favBtn = $(".favorite-button");

  $favBtn.on("click", function() {
    console.log('button triggered');

    $currentBtn = $(this).closest('button');

    if ($currentBtn.hasClass("favorite-false")) {
      $currentBtn.removeClass("favorite-false");
      $currentBtn.addClass("favorite-true")
    }

    else if ($currentBtn.hasClass("favorite-true")) {
      $currentBtn.removeClass("favorite-true");
      $currentBtn.addClass("favorite-false")
    }

  });

});

// listeners for the Pin Page view only - this script is added to the file views/pins.ejs

$(() => {

  $addPinBtn = $("#add-new-pin");
  $newPinForm = $("#new-pin-form");
  $newPinContainer = $(".new-pin-container");
  $titleBox = $("#new-pin-title");
  $cancelFormBtn = $("#cancel-new-pin-button");


  // show the add new pin form, and hide the ADD PIN button
  $addPinBtn.on("click", function() {
    $newPinContainer.slideDown("1000", function() {
      $titleBox.focus();
    })
    .removeClass("hidden");

    $addPinBtn.addClass("hidden");
  });


  // Rest and hide the add new pin form, and show the ADD PIN button again
  $cancelFormBtn.on("click", function() {
    $newPinContainer.slideToggle("fast");
    $addPinBtn.removeClass("hidden");
  });

});

//////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
//////////////////////////////////////////////////////////////
var userButtonVal,
    rocker,
    queryURL,
    fixedHeightImgAnimate,
    fixedHeightImgStill;

//////////////////////////////////////////////////////////////
// ARRAY FOR BUTTONS
//////////////////////////////////////////////////////////////
var rockers = ["Robert Plant", "Jimmy Page", "Jim Morrison", "Ray Manzarek", "Jimi Hendrix", "Janis Joplin", "Elton John", "Stevie Wonder", "Freddie Mercury", "Paul McCartney"];

//////////////////////////////////////////////////////////////
// FUNCTION UTILITIES
//////////////////////////////////////////////////////////////

// RENDER BUTTONS FUNCTION
function renderButtons() {
    $(".buttons").empty();

    for (var i = 0; i < rockers.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-primary rocker");
        b.attr("data-name", rockers[i]); // Adds a data-attribute
        b.text(rockers[i]);
        $(".buttons").append(b);
    }
}

// ADD NEW USER-GENERATED BUTTON
function addNewButton() {
    userButtonVal = $("#name").val();
    rockers.push(userButtonVal);
    // renderButtons();
    var nb = $("<button>");
    nb.addClass("btn btn-primary rocker");
    nb.attr("data-name", userButtonVal);
    nb.text(userButtonVal);
    $(".buttons").append(nb);
}

function getGifs() {
    $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $(".gifs-display").append("<div class='img-div text-center'><img src='" + response.data[i].images.fixed_height_still.url + "'class='returnedGif' alt='Rocker Gif' data-still=" + response.data[i].images.fixed_height_still.url + " data-animate=" + response.data[i].images.fixed_height.url + "><p>Rating: " + response.data[i].rating + "</p></div>");
            $(".returnedGif").attr("data-state", "still");
        }
        console.log(response);
    });
}

//////////////////////////////////////////////////////////////
// CLICK EVENT LISTENERS
//////////////////////////////////////////////////////////////

// CLICK LISTENER FOR ADD NEW USER BUTTON
$(".buttons").on("click", ".rocker", function() {
    rocker = $(this).attr("data-name");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rocker + "&limit=10&api_key=dc6zaTOxFJmzC";
    $(".gifs-display").empty();
    getGifs();
});

// CLICK LISTENER FOR ADD NEW USER BUTTON
$(".add-rocker-btn").on("click", function(e) {
    e.preventDefault();
    addNewButton();
    $("#name").val("");
});

// CLICK LISTENER FOR FETCHED GIFS TO PAUSE AND PLAY
$(".gifs-display").on("click", ".returnedGif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});


//////////////////////////////////////////////////////////////
// FUNCTION INITIALIZATION
//////////////////////////////////////////////////////////////
renderButtons();

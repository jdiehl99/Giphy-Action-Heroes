// document on ready
jQuery(($) => { // document on ready

    // array holding initial values for buttons
    var topics = ["Thor", "Iron man", "Chuck Norris", "Hawkeye", "Captain America", "Rambo", "Superman", "Wonder Woman"];


    // make buttons from array data
    function makeButtons() {
        $("#buttonList").empty();
        $.each(topics, function (index, value) {
            var b = $("<button>")
            b.addClass("hero btn btn-secondary")
            b.attr("data-name", topics[index])
            b.text(topics[index]),
                $("#buttonList").append(b);
        });
    }

    // function to handle ajax request and process return JSON
    function getTheGifs() {
        // empty the div when a new button is clicked
        $("#showGifs").empty();

        // get the search term/s from the button
        var gifSearch = $(this).attr("data-name");
        console.log("search term", gifSearch);
        // add search criteria to URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=870e05608b1f4f57906edb3144c445bc&q=" + gifSearch + "&limit=10&offset=0&rating=PG-13&lang=en";

        // send request to Giphy using ajax
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (results) {

            var data = results.data;
            for (var i = 0; i < data.length; i++) {

                // create variable to hold data for animated image
                var imageAnimate = data[i].images.original.url;

                // create variable to hold data for still image
                var imageStill = data[i].images.original_still.url;

                // create div to hold image and rating
                $("<div/>").append("#showGifs");

                // create dynamic image element
                var heroImage = $("<img>");

                // add attributes to image
                heroImage.attr("src", imageStill);
                heroImage.attr("alt", "hero image");
                heroImage.addClass("gif");
                heroImage.attr("data-state", "still");
                heroImage.attr("data-still", imageStill);
                heroImage.attr("data-animate", imageAnimate)


                // append image to div with id showGifs
                $("#showGifs").append(heroImage);

                var imgRating = data[i].rating;
                console.log("rating", imgRating);

                var imgCaption = $("<p>");
                imgCaption.text("Rating: " + imgRating);

                // append rating 
                $("#showGifs").append(imgCaption);

            }
        });
    } // end function to return results


    // add handler to listen for user to click on image with class hero
    function changeGifs() {
        let $this = $(this),
            currentState = $this.data('state');
        stillState = $this.data('still');
        animateState = $this.data('animate');

        var state = $(this).attr("data-state");
        var imageStill = $(this).attr("data-still");
        var imageAnimate = $(this).attr("data-animate");

        // if gif is static, make it move
        if (state == "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", imageAnimate)
        }

        // if gif is moving, make it stop
        if (state == "animate") {
            $(this).attr("data-state", "still");
            $(this).attr("src", imageStill)
        }
    }

    // add handler to add new hero to buttons
    $("#addhero").on("click", function () {
        event.preventDefault();

        var newHero = $("#hero-input").val().trim();

        // add new hero to button array
        topics.push(newHero);
        // regenerate buttons with new array data
        makeButtons();
        $("#hero-input").val("");

    });

    // add click handler to all buttons with class hero and display gifs in div with ID showGifs
    $(document).on("click", ".hero", getTheGifs);
    // add click handler to animate or still gifs when clicked
    $(document).on("click", ".gif", changeGifs);

    // time to make the buttons!
    makeButtons();
});

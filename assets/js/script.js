// document on ready
jQuery(($) => { // document on ready

    // array holding initial values for buttons
    var topics = ["Thor", "Iron man", "Hawkeye", "Captain America", "Superman", "Wonder Woman"];


    // make buttons from array data
    function makeButtons() {
        $("#buttonList").empty();
        $.each(topics, function (index, value) {
            var b = $("<button>")
            b.addClass("hero")
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
        console.log("search term",gifSearch);
        // add search criteria to URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=870e05608b1f4f57906edb3144c445bc&q=" + gifSearch + "&limit=25&offset=0&rating=PG-13&lang=en";

        // send request to Giphy using ajax
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (results) {
            console.log(results);

            var data = results.data;
            console.log(data.length);

            for (var i = 0; i < data.length; i++) {

                console.log(data[i].images.original);
                var imageUrl = data[i].images.original.url;

                // create dynamic image element
                var heroImage = $("<img>");

                // add attributes to image
                heroImage.attr("src", imageUrl);
                heroImage.attr("alt", "hero image");
                heroImage.attr("height", "200px");

                // append to div with id showGifs
                $("#showGifs").append(heroImage);
            }
        });
    }

    // add click handler to all buttons with class hero and display gifs in div with ID showGifs
    $(document).on("click", ".hero", getTheGifs);

    // time to make the buttons!
    makeButtons();
});

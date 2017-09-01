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
        // get the search term/s from the button
        var gifSearch = $(this).attr("data-name");
        // add search criteria to URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=870e05608b1f4f57906edb3144c445bc&q=&limit=12&offset=0&rating=PG-13&lang=en&q="+gifSearch;
        
                // send request to Giphy using ajax
                $.ajax({
                    url: queryURL,
                    method: 'GET'
                }).done(function (response) {
                    console.log(response);
                });
    }

    // add click handler to all buttons with class hero and display gifs in div with ID showGifs
    $(document).on("click", ".hero", getTheGifs);


        // time to make the buttons!
        makeButtons();
});

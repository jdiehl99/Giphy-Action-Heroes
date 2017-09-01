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


        // time to make the buttons!
        makeButtons();
});

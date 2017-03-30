$("#addButton").on("click", function() {
    var newGifButton = $("<button>")
        .attr("data-wordtobesearched", $("#buttonContent").val().trim())
        .html($("#buttonContent").val().trim());

    $("#buttonContainer").append(newGifButton);
    newGifButton.on("click", function(e) {
        e.preventDefault()
        searchgifs($("#buttonContent").val().trim());

    });

});

var i = 0;


var searchgifs = function(term) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&limit=" + $("#limit option:selected").val() + "&api_key=dc6zaTOxFJmzC";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(response) {
        var results = response.data;

        for (var j = 0; j < results.length; j++) {
            var gifDiv = $("<div>");
            var gifImage = $("<img>")
                .attr("src", results[j].images.fixed_height.url)
                .attr("data-animate", results[j].images.fixed_height.url)
                .attr("data-still", results[j].images.fixed_height_still.url)
                .attr("data-state", "animate");

            gifDiv.append(gifImage);

            $("#placeForClickedGifs").prepend(gifDiv);


        }

        $("#placeForClickedGifs img").on("click", function() {
            var state = $(this).attr("data-state");

            if (state == "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        });


    });


    return false;

};
$("#searchButton").on("click", function() {
    searchgifs($("#gifOptions option:selected").text());
});
var resetButton = $("#resetButton");

resetButton.on("click", function(){
	
	i = 0;
	
	$("#gifOptions").empty();
	gifChoices = [];
	
	$("#placeForClickedGifs").empty();
});
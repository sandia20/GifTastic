$(document).ready(function(){

    //Created Array to stored the elements for my topic
    var topics = ["mercedez benz", "audi", "bentley", "bmw", "toyota","jeep","land rover","suzuki"];

    // Function for displaying the buttons
    function renderButtons() {

        // (this is necessary otherwise you will have repeat buttons)
        $("#all-buttons").empty();

        // Looping through the array of cars
        for (var i = 0; i < topics.length; i++) {

        // Generating buttons for each car in the array
        var mybuttons = $("<button>").addClass("car").attr("data-name",topics[i]).text(topics[i]);
        // Adding the button to the buttons-view div
        $("#all-buttons").append(mybuttons);
        }
    }

    // Function to store the Giphy information
    function displayGiphyInfo() {
        $(".display").empty();

        var car = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=G5gy6GvEuHxwxP4aAOvAmHskWDDdwSGh&q=" + car + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                // var newDiv= $("<div>");
                var newDiv=$(".display");
                var rating = results[i].rating;

                var p = $("<p>").html("Rating: " + rating);
                p.addClass("col-3 float-md-left");
                // p.addClass("col-3");

                var carimage = $("<img>");
                carimage.attr("src", results[i].images.fixed_height_still.url);
                carimage.addClass("col-3 col-3 img-fluid img-thumbnail float-md-left")
                // carimage.addClass("float-md-left")

                carimage.attr("data-state","animate")
                carimage.attr("data-still",results[i].images.fixed_height_still.url);
                carimage.attr("data-animate", results[i].images.fixed_height.url);
                
                newDiv.prepend("<br>", p,carimage);
                
                $(".display").prepend(newDiv);

                //this function will pause/start the giphy when image is clicked
                $(carimage).on("click", function() {

                console.log(this)
                var state = $(this).attr("data-state");

                if (state === "animate"){
                    var animate= $(this).attr("data-animate");
                    $(this).attr("src",animate);
                    state= $(this).attr("data-state","still");
                }
                else if (state === "still"){
                    var still= $(this).attr("data-still");
                    $(this).attr("src",still);
                    state= $(this).attr("data-state","animate");
                }
                });
            };

        });
    };

        
        // This function handles events where one button is clicked
        $("#add-car").on("click", function(event) {
            event.preventDefault();

            // This line grabs the input from the textbox
            var car = $("#car-input").val().trim();
            var found = 1;
            for(var i=0;i<topics.length;i++){
                if (car === topics[i]){
                    alert("That Car already exist.  Please search for another car!");
                    console.log(car,i)
                    found=3;
                } 
            }
                if (found === 1){
                // Adding the car from the textbox to the array
                topics.push(car);
                };
            
            // Calling renderButtons which handles the processing of our movie array
            renderButtons();
        });

        // function clearImagesDiv() {
        // $(".display").empty();

        // }




        // Function for displaying the movie info
        // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
        $(document).on("click", ".car", displayGiphyInfo);
        // clearImagesDiv();
        // Calling the renderButtons function to display the initial buttons
        renderButtons();


});


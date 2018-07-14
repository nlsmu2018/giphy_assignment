
//1. $( document ).ready()
//A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you. Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute. Code included inside $( window ).on( "load", function() { ... }) will run once the entire page (images or iframes), not just the DOM, is ready.//

$(document).ready(function(){
    
    //2. Creating Animals Array
        var animals= [
            "zebra", "horse", "dolphin",
             "Turtle", "dog", "tiger",
        ];
    
    //3. Function to add buttons to page
    function populateButtons(newArray, classToAdd, addHere) {
        $(addHere).empty();
        for (var i = 0; i < newArray.length; i++) {
          var a = $("<button>");
          a.addClass(classToAdd);
          a.attr("data-type", newArray[i]);
          a.text(newArray[i]);
          $(addHere).append(a);
        }
    
      }
    
    //4. Each time a button is clicked old content is removed and new giphy content chosen is added
       $(document).on("click", ".animal-button", function() {
       $("#animals").empty();
       $(".animal-button").removeClass("active");
       $(this).addClass("active");
    
    //5. Giphy API
       var type = $(this).attr("data-type");
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    //7. Making the AJAX GET API call
        $.ajax({
        url: queryURL,
        method: "GET"
        })
    
    //8.Rendering the Giphy
    .then(function(response) {
        var results = response.data;
    
        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");
    
          var rating = results[i].rating;
    
          var p = $("<p>").text("Rating: " + rating);
    
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
    
          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");
    
          animalDiv.append(p);
          animalDiv.append(animalImage);
    
          $("#animals").append(animalDiv);
        }
      });
    });
    
    
    
     //Animate
     $(document).on("click", ".animal-image", function() {
    
        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("input").eq(0).val();
    
        if (newAnimal.length > 2) {
          animals.push(newAnimal);
        }
    
        populateButtons(animals, "animal-button", "#animal-buttons");
    
      });
    
      populateButtons(animals, "animal-button", "#animal-buttons");
    });
    
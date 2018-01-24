$( document ).ready(function() {

// Initial array of animals
var animals = ["dog", "cat", "turtle", "dolphin", "duck", "elephant", "bird", "hamster", "rabbit", "horse", "monkey", "goat", "squirrel"];

// Function for displaying animal data
function displayGifButtons() {
// Deleting the animal prior to adding new animals
// (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var gifButton = $("<button>");
          // Adding a class of animal to our button
          gifButton.addClass("animal");
          gifButton.addClass("btn btn-primary");
          // Adding a data-attribute
          gifButton.attr("data-name", animals[i]);
          // Providing the initial button text
          gifButton.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(gifButton);
          }
}

// Function to add a new animal button
function addNewButton(){
    $("#add-animal").on("click", function(){
    var animal = $("#animal-input").val().trim();
      if (animal == ""){
        return false; // added so user cannot add a blank button
         }
    animals.push(animal);
    displayGifButtons();
    return false;
    });
}
// Function to reset added animal buttons
function reset(){
      $("reset").on("click", function(){
      animals.pop(animal);
      displayAnimalGifs();
      return false;
      });
}
// displayAnimalGifs function re-renders the HTML to display the appropriate content
      function displayAnimalGifs() {
        
        var animal = $(this).attr("data-name");
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          $("#animals-view").empty(); //erasing anything in this div id so it doesn't keep anything from the previous click
          var results = response.data; //shows results of gifs
          if (results == ""){
            alert("There isn't a gif for this selected button");
          }
          for (var i = 0; i < results.length; i++) {

          // Creating a div to hold the animal
          var animalDiv = $("<div>");
          animalDiv.addClass("animalDiv");

          // Creating an element to have the rating displayed
          var animalRating = $("<p>").text("Rating: " + results[i].rating);    
          animalDiv.append(animalRating)
          // Creating an element to hold the image
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height_still.url)
          .attr("data-still", results[i].images.fixed_height_still.url)
          .attr("data-animate", results[i].images.fixed_height.url)
          .attr("data-state", "still"); //set the image state
          animalImage.addClass("image");
          // Appending the animal gifs
      
          animalDiv.append(animalImage);

          // Putting the entire movie above the previous movies
          $("#animals-view").prepend(animalDiv);
        }
        });    
}

// Calling Functions & Methods
displayGifButtons(); // displays list of animals already created
addNewButton();
reset();
// Document Event Listeners
$(document).on("click", ".animal", displayAnimalGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
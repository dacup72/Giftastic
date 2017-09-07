$(document).ready(function() {

//Global Variables
//====================================================================

var gifs = [
    "puppies",
    "kittens",
    "explosion",
    "adam sandler"
];

//Constructor Functions
//====================================================================

function makeNewButton(btn) {
  let newGifButton = $("<button class='btn btn-success'>");
    newGifButton.attr("giphy", btn);
    newGifButton.text(btn);
    newGifButton.on('click', displayGifs);
  return newGifButton;
}

function makeNewGif(gif) {
  let playGif = gif.images.fixed_height.url;
  let pauseGif = gif.images.fixed_height_still.url;
  let gifRating = gif.rating;
  let playstate = false;

  let gifElement = $("<div class='gif'><div>");
  let rating = $("<p>rating: " + gifRating + "</p>");
  let gifImage = $("<img class='gifImage'></img>");

  gifElement.append(rating);
  gifElement.append(gifImage);
  gifImage.attr("src", pauseGif);

  //click to toggle play and pause
  gifImage.on('click', function() {
    if(!playstate) {
      gifImage.attr('src', playGif);
    } else {
      gifImage.attr('src', pauseGif);
    }
    playstate = !playstate;
  })
  return gifElement;
}

//Process Functions
//====================================================================

function clickSubmit() {
  let newButtonText = $("#newGifButton").val();
  gifs.push(newButtonText);
  displayNewButtons();
}

function displayNewButtons() {
  $("#gifButtons").empty();
  for (let i = 0; i < gifs.length; i++) {
    let gifbtn = makeNewButton(gifs[i]);
    $("#gifButtons").append(gifbtn);
  }
}

function displayGifs() {
  $("#gifDisplay").html('Loading Gifs...');
  let gifName = $(this).attr("giphy");
  let queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifName+"&api_key=dc6zaTOxFJmzC&rating=r&sort=relevant&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    $("#gifDisplay").html('');
    let results = response.data;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      let gifImage = makeNewGif(response.data[i]);
      $("#gifDisplay").prepend(gifImage);    
    }
  })
}

function buttonRepeatChecker(input) {
  var test = true;
  for (let i = 0; i < gifs.length; i++) {
    if (gifs[i] === input) {
      test = false;   
    }
  }
  return test;
}


//Buttons
//====================================================================

$("#formSubmit").on("click", function(event) {
  event.preventDefault();
  let text = $('#newGifButton').val();
  let test = buttonRepeatChecker(text); 
  console.log(test); 
  if(text.length > 0 && test) {
    clickSubmit();
  } else if($('#newGifButton').val().length > 0 && !test) {
    alert(text + " is already an existing button");
  } else {
    alert("The new button must not be blank.");
  }
});



displayNewButtons();
});

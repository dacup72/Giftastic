$(document).ready(() => {

  // GLOBAL VARIABLES
  let search;
  let images = [];
  let tapspeed = 0;
let state;
let pullNum = 10;

  // Click event to add new button
  $('#addSearch').on('click', event => {
    event.preventDefault();

    search = $('#searchInput').val().trim();
    $('#searchResults').prepend(search);
    images.push(search);

    renderButtons();
    document.getElementById('searchInput').value = '';
  });

  // Function to render the added buttons
  let renderButtons = () => {
    $("#searchResults").empty();

    for (let i = 0; i < images.length; i++) {
      let newBtn = $(`
          <button class="btnSearch" data-name="${images[i]}">
            ${images[i]}
          </button>
        `);
      $("#searchResults").prepend(newBtn);
    }
  }
let renderGif = () => {
  pullN = $('#pull').val();

    let srcOpt = $('input[name=optradio]:checked').val(); 
 

  search = $(this).attr("data-name");
    
    let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + search;
  
 for (let i = 0; i < pullNum; i++) {
   
 
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then( (response) => {
      console.log(response)

      if (srcOpt === "lg") {
        let imgUrl = response.data.images.downsized_still.url;
        let imgAni = response.data.images.downsized.url; 
    } else {
        let imgUrl = response.data.images.fixed_height_small_still.url; 
        let imgAni = response.data.images.fixed_height_small.url;  
    }

    console.log (response.data.images);
        let image = $(`
          <img src="${imgUrl}" data-animate="${imgAni}" data-still="${imgUrl}" data-state="still" class="gify">
        `);
     
        image.append(images);
            
            $("#gif").prepend(image);
            // console.log (this);
    });
  }
}
  

});













// =======================
// OLD CODE
// =======================



// $(document).ready(function() {

// //Global Variables
// //====================================================================

// var gifs = [
//     "puppies",
//     "kittens",
//     "explosion",
//     "adam sandler"
// ];

// //Constructor Functions
// //====================================================================

// function makeNewButton(btn) {
//   let newGifButton = $("<button class='btn btn-success'>");
//     newGifButton.attr("giphy", btn);
//     newGifButton.text(btn);
//     newGifButton.on('click', displayGifs);
//   return newGifButton;
// }

// function makeNewGif(gif) {
//   let playGif = gif.images.fixed_height.url;
//   let pauseGif = gif.images.fixed_height_still.url;
//   let gifRating = gif.rating;
//   let playstate = false;

//   let gifElement = $("<div class='gif'><div>");
//   let rating = $("<p class='rating'>rating: " + gifRating + "</p>");
//   let gifImage = $("<img class='gifImage'></img>");

//   gifElement.append(rating);
//   gifElement.append(gifImage);
//   gifImage.attr("src", pauseGif);

//   //click to toggle play and pause
//   gifImage.on('click', function() {
//     if(!playstate) {
//       gifImage.attr('src', playGif);
//     } else {
//       gifImage.attr('src', pauseGif);
//     }
//     playstate = !playstate;
//   })
//   return gifElement;
// }

// //Process Functions
// //====================================================================

// function clickSubmit() {
//   let newButtonText = $("#newGifButton").val();
//   gifs.push(newButtonText);
//   displayNewButtons();
// }

// function displayNewButtons() {
//   $("#gifButtons").empty();
//   for (let i = 0; i < gifs.length; i++) {
//     let gifbtn = makeNewButton(gifs[i]);
//     $("#gifButtons").append(gifbtn);
//   }
// }

// function displayGifs() {
//   $("#gifDisplay").html('Loading Gifs...');
//   let gifName = $(this).attr("giphy");
//   let queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifName+"&api_key=dc6zaTOxFJmzC&rating=r&sort=relevant&limit=10";
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).done(function(response) {
//     $("#gifDisplay").html('');
//     let results = response.data;
//     console.log(results);
//     for (let i = 0; i < results.length; i++) {
//       let gifImage = makeNewGif(response.data[i]);
//       $("#gifDisplay").prepend(gifImage);    
//     }
//   })
// }

// function buttonRepeatChecker(input) {
//   var test = true;
//   for (let i = 0; i < gifs.length; i++) {
//     if (gifs[i] === input) {
//       test = false;   
//     }
//   }
//   return test;
// }


// //Buttons
// //====================================================================

// $("#formSubmit").on("click", function(event) {
//   event.preventDefault();
//   let text = $('#newGifButton').val();
//   let test = buttonRepeatChecker(text); 
//   console.log(test); 
//   if(text.length > 0 && test) {
//     clickSubmit();
//   } else if($('#newGifButton').val().length > 0 && !test) {
//     alert(text + " is already an existing button");
//   } else {
//     alert("The new button must not be blank.");
//   }
// });


// displayNewButtons();
// });

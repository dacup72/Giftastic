$(document).ready(() => {

  // GLOBAL VARIABLES
  let search;
  let images = [];
  let tapspeed = 0;
  let state;
  let pullNum = 10;

  // Click event to add new button
  $('#addSearch').on('click', function () {
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

  $(document).on("click", "img", function () {

    state = $(this).attr("data-state");
    if (state === "still") {
      console.log("the state is still")
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");

    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

    if (tapspeed == 0) {
      tapspeed = new Date().getTime();
    } else {
      if (((new Date().getTime()) - tapspeed) < 800) {
        if ($(this).hasClass('fav')) {
          $(this).remove();
          $("#gif").prepend($(this));
          $(this).removeClass("fav");
        }
        else {
          $("#fav").append($(this));
          $(this).addClass("fav");
        }

        tapspeed = 0;
      } else {

        tapspeed = new Date().getTime();

      }
    }
  });

  $(document).on("click", ".btnSearch", function () {


  });





  let renderGif = () => {
    pullNum = $('#pull').val();

    let srcOpt = $('input[name=optradio]:checked').val();


    search = $(this).attr("data-name");
    let queryURL = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=dc6zaTOxFJmzC&rating=r&sort=relevant&limit=${pullNum}`;
    // let queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + search;




    $.ajax({
      url: queryURL,
      method: "GET"
    }).then((response) => {
      console.log("response: ", JSON.stringify(response, null, 2));
      for (let i = 0; i < response.length; i++) {
        let imgUrl;
        let imgAni;

        if (srcOpt === "lg") {
          imgUrl = response.data[i].images.downsized_still.url;
          imgAni = response.data[i].images.downsized.url;
        } else {
          imgUrl = response.data[i].images.fixed_height_small_still.url;
          imgAni = response.data[i].images.fixed_height_small.url;
        }

        let image = $(`
          <img src="${imgUrl}" data-animate="${imgAni}" data-still="${imgUrl}" data-state="still" class="gify">
        `);

        $("#gif").prepend(image);
      }
    });

  }

  $(document).on("click", ".btnSearch", renderGif);

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

// HTML Elements
var notepad = document.getElementById("notepad");
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");

// save and load menu Element
var nameSoundset = document.getElementById("name-soundset");
var saveButton = document.getElementById("save-button");
var loadMenu = document.getElementById("load-menu"); var deleteButton = document.getElementById("delete-button");

var stepUp = document.getElementById("step-up");
var stepDown = document.getElementById("step-down");

// Audio Player
var player = document.getElementById("player");
var audioplayers = document.getElementById("audio-players");

var stopGlobal = document.getElementById("stop-global");
var playGlobal = document.getElementById("play-global");
var pauseGlobal = document.getElementById("pause-global");

// loop checkbox
var loopCheckbox = document.getElementById("loop-checkbox");

// local storage stuff
var savedSounds = JSON.parse(localStorage.getItem('savedSounds')) || [];
if (savedSounds.length > 0) {
  savedSounds.forEach(option => {
    var loadItem = document.createElement("option");
    loadItem.innerHTML = option.title;
    loadMenu.appendChild(loadItem);
  });
}

var soundId = Math.floor(Math.random() * 500000);
var randomPageNumber = Math.floor(Math.random() * 50);
var inputPossibilities = "aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ `~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ \| [{ ]} ;: ' <, >. ?/";
var alphabet = inputPossibilities.split(" ");


// main function
var wholeThing = function () {

  fetch(
    'https://freesound.org/apiv2/sounds/' + soundId + '/similar/?descriptors=lowlevel.spectral_energyband_middle_high.max%20AND%20lowlevel.pitch_salience.max%20AND%20lowlevel.spectral_rms.max%20AND%20lowlevel.dissonance.max%20AND%20lowlevel.spectral_decrease.min&page=2&page_size=47&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe' /* 1st API Key: GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC */
  )
    .then(function (response) {
      if (response.status === 404) {
        location.reload();
      }
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      window.globalResponse = response;


      notepad.addEventListener('input', (e) => {
        for (i = 0; i < 47; i++) {
          if (alphabet[i].includes(e.data)) {
            window.iGlobal = i;
          }
        }

        fetch(
          "https://freesound.org/apiv2/sounds/" + response.results[iGlobal].id + "?preview-hq-mp3&token=GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC" /* 1st API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe*/
        )
          .then(function (soundThing) {
            return soundThing.json();
          })
          .then(function (soundThing) {
            console.log(soundThing.previews['preview-hq-mp3']);


            var player = document.createElement("audio");
            player.autoplay = false;
            player.controls = true;
            if (loopCheckbox.checked === true) {
              player.loop = true;
            }
            player.setAttribute("src", soundThing.previews['preview-hq-mp3']);
            audioplayers.appendChild(player);

            // pause, stop and play buttons
            loopCheckbox.addEventListener('click', function () {
              if (loopCheckbox.checked === true) {
                player.loop = true;
              }
              else {
                player.loop = false;
              }
            })

            pauseGlobal.addEventListener('click', function () {
              player.pause();
            })

            stopGlobal.addEventListener('click', function () {
              player.pause();
              player.currentTime = 0;
            })

            playGlobal.addEventListener('click', function () {
              player.play();
            })
          })
      })
    })
};

// save and load
saveButton.addEventListener('click', function () {
  var soundsetSaveName = {
    title: nameSoundset.value,
    data: globalResponse
  };
  savedSounds.push(soundsetSaveName);
  localStorage.setItem("savedSounds", JSON.stringify(savedSounds));
  var loadItem = document.createElement("option");
  loadItem.innerHTML = soundsetSaveName.title;
  loadMenu.appendChild(loadItem);
})

loadMenu.addEventListener('change', function () {
  localStorage.getItem(savedSounds);
})


wholeThing();


// search bar
searchButton.addEventListener('click', function () {
  fetch("https://freesound.org/apiv2/search/text/?query=" + searchBar.value + "&page_size=47&page=" + randomPageNumber + "&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe"
  )
    .then(function (response) {
      if (response.status === 404) {
        location.reload();
      }
      return response.json();
    })

    .then(function (response) {
      console.log(response);
      window.globalResponse = response;


      notepad.addEventListener('input', (e) => {
        for (i = 0; i < 47; i++) {
          if (alphabet[i].includes(e.data)) {
            window.iGlobal = i;
          }
        }

        fetch(
          "https://freesound.org/apiv2/sounds/" + response.results[iGlobal].id + "?preview-hq-mp3&token=GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC" /* 1st API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe*/
        )
          .then(function (soundThing) {
            return soundThing.json();
          })
          .then(function (soundThing) {
            console.log(soundThing.previews['preview-hq-mp3']);


            var player = document.createElement("audio");
            player.autoplay = true;
            player.controls = true;
            if (loopCheckbox.checked === true) {
              player.loop = true;
            }
            player.setAttribute("src", soundThing.previews['preview-hq-mp3']);
            audioplayers.appendChild(player);

            // pause, stop and play buttons
            pauseGlobal.addEventListener('click', function () {
              player.pause();
            })

            stopGlobal.addEventListener('click', function () {
              player.pause();
              player.currentTime = 0;
            })

            playGlobal.addEventListener('click', function () {
              player.play();
            })
          })
      })
    })
});


deleteButton.addEventListener('click', function () {
  while (audioplayers.firstChild) {
    audioplayers.lastChild.remove();
  }
});



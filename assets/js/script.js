// HTML Elements
var notepad = document.getElementById("notepad");
var searchBar = document.getElementById("search-bar");
var searchButton = document.getElementById("search-button");

// save and load menu Element
var nameSoundset = document.getElementById("name-soundset");
var saveButton = document.getElementById("save-button");
var loadMenu = document.getElementById("load-menu");
//var searchbtn = document.getElementById("search-button")

var bgVideo = document.getElementById("bg-video");

// Audio Player
var player = document.getElementById("player");
var audioplayers = document.getElementById("audio-players");

// Global Buttons
var stopGlobal = document.getElementById("stop-global");
var playGlobal = document.getElementById("play-global");
var pauseGlobal = document.getElementById("pause-global");
var deleteButton = document.getElementById("delete-button");
var newSoundsButton = document.getElementById("new-sounds-button");


// Checkboxes
var loopCheckbox = document.getElementById("loop-checkbox");
var autoplayCheckbox = document.getElementById("autoplay-checkbox");

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
var randomVideo = Math.floor(Math.random() * 5000) + soundId;
var inputPossibilities = "aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ `~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ \| [{ ]} ;: ' <, >. ?/";
var alphabet = inputPossibilities.split(" ");


// main function
var wholeThing = function () {
  document.querySelector("body").style.visibility = 'hidden';
  document.getElementById("loader").style.visibility = 'visible';

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

      k = Math.floor(Math.random() * 19);

      fetch("https://api.pexels.com/videos/search?query=" + response.results[0].tags[1] + "&per_page=20", {
        headers: {
          Authorization: "563492ad6f91700001000001423d0c460fd74c83a087ce29afa13898"
        }
      })
        .then(function (videoResponse) {
          return videoResponse.json();
        })
        .then(function (videoResponse) {
          console.log(videoResponse);
          if (videoResponse.videos[k] === undefined) {
            fetch("https://api.pexels.com/videos/popular?per_page=25", {
              headers: {
                Authorization: "563492ad6f91700001000001423d0c460fd74c83a087ce29afa13898"
              }
            })
            .then(function (videoResponse) {
              return videoResponse.json();
            })
            .then(function (videoResponse) {
              bgVideo.setAttribute("src", videoResponse.videos[k].video_files[0].link);
          })}
          else {
          bgVideo.setAttribute("src", videoResponse.videos[k].video_files[0].link);
          }
        })

      document.querySelector("body").style.visibility = 'visible';
      document.querySelector("body").style.backgroundColor = 'transparent';
      document.getElementById("loader").style.visibility = 'hidden';
      
      notepad.addEventListener('input', (e) => {
        for (i = 0; i < 47; i++) {
          if (alphabet[i].includes(e.data)) {
            window.iGlobal = i;
          }
        }
        //Find this comment if you can
    

     
    })
});

notepad.addEventListener('input', (e) => {
  var response = window.globalResponse
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
      player.controls = true;
      if (autoplayCheckbox.checked === true) {
        player.autoplay = true;
      }
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
//searchbtn.addEventListener('click', function(event) {
//var searchSounds = console.log("searching")
//})

//var save-containerEL = document.querySelector('#save-container');

//save-containerEl.innerHTML = ' ';

//var producedSound = document.createElement('sound')
//producedSound.setAttribute('src', response.data[0])
//save-containerEl.appendChild(producedSound)});


saveButton.addEventListener('click', function () {
  var soundsetSaveName = {
    title: nameSoundset.value,
    data: globalResponse,
  };
  savedSounds.push(soundsetSaveName);
  localStorage.setItem("savedSounds", JSON.stringify(savedSounds));
  var loadItem = document.createElement("option");
  loadItem.innerHTML = soundsetSaveName.title;
  loadMenu.appendChild(loadItem);
})

loadMenu.addEventListener('change', function () {
  localStorage.getItem(savedSounds);
  notepad.addEventListener('input', (e) => {
    for (i = 0; i < 47; i++) {
      if (alphabet[i].includes(e.data)) {
        window.iGlobal = i;
      }
    }

    fetch(
      "https://freesound.org/apiv2/sounds/" + savedSounds[0].data.results[iGlobal].id + "?preview-hq-mp3&token=GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC" /* 1st API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe*/
    )
      .then(function (soundThing2) {
        return soundThing2.json();
      })
      .then(function (soundThing2) {
        console.log(soundThing2.previews['preview-hq-mp3']);


        var player = document.createElement("audio");
        if (autoplayCheckbox.checked === true) {
        player.autoplay = true;
        }
        player.controls = true;
        if (loopCheckbox.checked === true) {
          player.loop = true;
        }
        player.setAttribute("src", soundThing2.previews['preview-hq-mp3']);
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
});



wholeThing();


// search bar
searchButton.addEventListener('click', function () {
  document.getElementById("loader").style.visibility = 'visible';
  fetch("https://freesound.org/apiv2/search/text/?query=" + searchBar.value + "&page_size=47&page=" + randomPageNumber + "&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe"
  )
    .then(function (response2) {
      if (response2.status === 404 || response2.count === 0) {
        noResults = document.createElement("div");
        noResults.textContent = "No Results Found";
        document.getElementById("search-container").appendChild(noResults);
        document.getElementById("loader").style.visibility = 'visible';

  fetch(
    'https://freesound.org/apiv2/sounds/' + soundId + '/similar/?descriptors=lowlevel.spectral_energyband_middle_high.max%20AND%20lowlevel.pitch_salience.max%20AND%20lowlevel.spectral_rms.max%20AND%20lowlevel.dissonance.max%20AND%20lowlevel.spectral_decrease.min&page=2&page_size=47&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe' /* 1st API Key: GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC */
  )
    .then(function (response2) {
      if (response2.status === 404) {
        location.reload();
      }
      return response2.json();
    })
    .then(function (response2) {
      console.log(response2);
      window.globalResponse = response2;

      document.getElementById("loader").style.visibility = 'hidden';
    })
  }
      return response2.json();
    })

    .then(function (response2) {
      console.log(response2);
      window.globalResponse = response2;
      document.getElementById("loader").style.visibility = 'hidden';


      // notepad.addEventListener('input', (e) => {
      //   for (i = 0; i < 47; i++) {
      //     if (alphabet[i].includes(e.data)) {
      //       window.iGlobal = i;
      //     }
      //   }

      //   fetch(
      //     "https://freesound.org/apiv2/sounds/" + response2.results[iGlobal].id + "?preview-hq-mp3&token=GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC" /* 1st API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe*/
      //   )
      //     .then(function (soundThing2) {
      //       return soundThing2.json();
      //     })
      //     .then(function (soundThing2) {
      //       console.log(soundThing2.previews['preview-hq-mp3']);


      //       var player = document.createElement("audio");
      //       if (autoplayCheckbox.checked === true) {
      //         player.autoplay = true;
      //       }
      //       player.controls = true;
      //       if (loopCheckbox.checked === true) {
      //         player.loop = true;
      //       }
      //       player.setAttribute("src", soundThing2.previews['preview-hq-mp3']);
      //       audioplayers.appendChild(player);

      //       // pause, stop and play buttons
      //       pauseGlobal.addEventListener('click', function () {
      //         player.pause();
      //       })

      //       stopGlobal.addEventListener('click', function () {
      //         player.pause();
      //         player.currentTime = 0;
      //       })

      //       playGlobal.addEventListener('click', function () {
      //         player.play();
      //       })
      //     })
      // })
    })
});

newSoundsButton.addEventListener('click', function () {
  document.getElementById("loader").style.visibility = 'visible';

  fetch(
    'https://freesound.org/apiv2/sounds/' + soundId + '/similar/?descriptors=lowlevel.spectral_energyband_middle_high.max%20AND%20lowlevel.pitch_salience.max%20AND%20lowlevel.spectral_rms.max%20AND%20lowlevel.dissonance.max%20AND%20lowlevel.spectral_decrease.min&page=2&page_size=47&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe' /* 1st API Key: GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC */
  )
    .then(function (response3) {
      if (response3.status === 404) {
        location.reload();
      }
      return response3.json();
    })
    .then(function (response3) {
      console.log(response3);
      window.globalResponse = response3;

      document.getElementById("loader").style.visibility = 'hidden';

      // notepad.addEventListener('input', (e) => {
      //   for (i = 0; i < 47; i++) {
      //     if (alphabet[i].includes(e.data)) {
      //       window.iGlobal = i;
      //     }
      //   }

      //   fetch(
      //     "https://freesound.org/apiv2/sounds/" + response3.results[iGlobal].id + "?preview-hq-mp3&token=GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC" /* 1st API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe*/
      //   )
      //     .then(function (soundThing3) {
      //       return soundThing3.json();
      //     })
      //     .then(function (soundThing3) {
      //       console.log(soundThing3.previews['preview-hq-mp3']);


      //       var player = document.createElement("audio");
      //       player.controls = true;
      //       if (autoplayCheckbox.checked === true) {
      //         player.autoplay = true;
      //       }
      //       if (loopCheckbox.checked === true) {
      //         player.loop = true;
      //       }
      //       player.setAttribute("src", soundThing3.previews['preview-hq-mp3']);
      //       audioplayers.appendChild(player);

      //       // pause, stop and play buttons
      //       loopCheckbox.addEventListener('click', function () {
      //         if (loopCheckbox.checked === true) {
      //           player.loop = true;
      //         }
      //         else {
      //           player.loop = false;
      //         }
      //       })

      //       pauseGlobal.addEventListener('click', function () {
      //         player.pause();
      //       })

      //       stopGlobal.addEventListener('click', function () {
      //         player.pause();
      //         player.currentTime = 0;
      //       })

      //       playGlobal.addEventListener('click', function () {
      //         player.play();
      //       })
      //     })
      // })
    })
});


deleteButton.addEventListener('click', function () {
  while (audioplayers.firstChild) {
    audioplayers.lastChild.remove();
  }
});



// lajf;lksdjg;lkasjf;ldsj;al
};

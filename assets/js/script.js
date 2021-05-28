// HTML Elements
var notepad = document.getElementById("notepad");
var searchTerm = document.getElementById("search-bar").value;

// save and load menu Element
var nameSoundset = document.getElementById("name-soundset");
var saveButton = document.getElementById("save-button");
var loadMenu = document.getElementById("load-menu");

// Audio Player
var player = document.getElementById("player");
var textAndAudioHandler = document.getElementById("text-and-audio");

var stopGlobal = document.getElementById("stop-global");
var playGlobal = document.getElementById("play-global");

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

counter = 0;

var soundId = Math.floor(Math.random() * 500000);
var inputPossibilities = "aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ `~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ \| [{ ]} ;: ' <, >. ?/";
var alphabet = inputPossibilities.split(" ");


// main function
var wholeThing = function() {
  
fetch(
  'https://freesound.org/apiv2/sounds/' + soundId + '/similar/?descriptors=lowlevel.spectral_energyband_middle_high.max%20AND%20lowlevel.pitch_salience.max%20AND%20lowlevel.spectral_rms.max%20AND%20lowlevel.dissonance.max%20AND%20lowlevel.spectral_decrease.min&page=2&page_size=47&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe' /* 1st API Key: GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC */
)
  .then(function(response) {
    if (response.status === 404) {
      location.reload();
    }
    return response.json();
    
  })
    
  .then(function(response) {
    console.log(response);
    window.globalResponse = response;
  

   
    notepad.addEventListener('input', (e) => {
      for (i=0; i < 47; i++) {
        if (alphabet[i].includes(e.data)) {
            window.iGlobal = i;
        }
      }
        
    
    counter++;

      fetch (
      "https://freesound.org/apiv2/sounds/" + response.results[iGlobal].id + "?preview-hq-mp3&token=GafImFip5SoYm0xr01e4vWveTLlHqLcsHCVMlmTC" /* 1st API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe*/
      )
        .then(function(soundThing) {
          return soundThing.json();
        })
        .then(function(soundThing) {
        console.log(soundThing.previews['preview-hq-mp3']);
        
        
          var player = document.createElement("audio");
          player.setAttribute("id", counter);
          player.autoplay = true;
          player.controls = true;
          if (loopCheckbox.checked === true) {
            player.loop = true;
          }
          player.setAttribute("src", soundThing.previews['preview-hq-mp3']);
          textAndAudioHandler.appendChild(player);
          
          // stop and play buttons
          stopGlobal.addEventListener('click', function() {
            player.pause();
            player.currentTime = 0;
          })
          
          playGlobal.addEventListener('click', function() {
            player.play();
          })
        })
      })
    })
};



saveButton.addEventListener('click', function(){
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

loadMenu.addEventListener('change', function(){
  localStorage.getItem(savedSounds);
})


wholeThing();



  



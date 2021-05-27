var notepad = document.getElementById("notepad");
var searchTerm = document.getElementById("search-bar").value;

var soundId = Math.floor(Math.random() * 500000);
var inputPossibilities = "aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ `~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ \| [{ ]} ;: ' <, >. ?/";
var alphabet = inputPossibilities.split(" ");

var player = document.getElementById("player");
var polyphonyOptions = document.getElementById("polyphony-options");


// Event Listeners
polyphonyOptions.addEventListener('change', function() {
  for (i=0; i < polyphonyOptions.value; i++) {
    var voice = document.createElement("audio");
    voice.id = "player" + (i + 1);
    console.log(voice.id);
  }
})

// main function
var wholeThing = function() {
  
fetch(
  'https://freesound.org/apiv2/sounds/' + soundId + '/similar/?descriptors=lowlevel.spectral_energyband_middle_high.max%20AND%20lowlevel.pitch_salience.max%20AND%20lowlevel.spectral_rms.max%20AND%20lowlevel.dissonance.max%20AND%20lowlevel.spectral_decrease.min&page=2&page_size=47&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe' /* 2nd API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe */
)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
   /* if (response === 404) {
      location.reload();
    }
    */
   
  notepad.addEventListener('input', (e) => {
      for (i=0; i < 47; i++) {
        if (alphabet[i].includes(e.data)) {
            window.iGlobal = i;
        }
      }
    
    fetch (
    "https://freesound.org/apiv2/sounds/" + response.results[iGlobal].id + "?preview-hq-mp3&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe" /* 2nd API Key: RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe */
    )
      .then(function(soundThing) {
        return soundThing.json();
      })
      .then(function(soundThing) {
      console.log(soundThing.previews['preview-hq-mp3']);
      player.setAttribute("src", soundThing.previews['preview-hq-mp3']);
      })
    })
  })
}

wholeThing();



  



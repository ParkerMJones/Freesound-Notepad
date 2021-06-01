var notepad = document.getElementById("notepad");

// var searchTerm = document.getElementById("search-bar").value;

var soundId = Math.floor(Math.random() * 440000);

var inputPossibilities = "aA bB cC dD eE fF gG hH iI jJ kK lL mM nN oO pP qQ rR sS tT uU vV wW xX yY zZ `~ 1! 2@ 3# 4$ 5% 6^ 7& 8* 9( 0) -_ =+ \| [{ ]} ;: ' <, >. ?/";
var alphabet = inputPossibilities.split(" ");
console.log(alphabet);

var player = document.getElementById("player");

var wholeThing = function() {
fetch(
  'https://freesound.org/apiv2/search/content?target=' + soundId + '&page_size=47&fields=id,tags&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe'
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
    console.log(`Key "${e.data}" input`);
      for (i=0; i < 47; i++) {
        if (alphabet[i].includes(e.data)) {
            console.log(alphabet[i]);
            console.log("Sound Id: " + response.results[i].id);
            window.iGlobal = i;
        }
      }
    
    fetch (
    "https://freesound.org/apiv2/sounds/" + response.results[iGlobal].id + "?preview-lq-mp3&token=RqRsqgfKWUzssyVjBxkUg9ezWKNdZzqad7v4eKbe"
    )
      .then(function(soundThing) {
        return soundThing.json();
      })
      .then(function(soundThing) {
      console.log(soundThing.previews['preview-lq-mp3']);
      player.setAttribute("src", soundThing.previews['preview-lq-mp3']);
      })
    })
  });
}

wholeThing();



  



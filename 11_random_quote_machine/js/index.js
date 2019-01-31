 // Return a random fact object from the given JSON object which contains a list of all facts (json)
function getRandomFactObj(json, prop) {
  var random = Math.floor(Math.random() * json[prop].length);
  return json[prop][random];
}
// Display the text property of the given fact object (currentFact) within the html tags specified by the given id (positionId)
function displayFactText(currentFact, positionId) {
  document.getElementById(positionId).innerHTML = currentFact.text;
}
// Display the author of the given fact object (currentFact) within the html tags specified by the given id (positionId)
function displayFactAuthor(currentFact, positionId) {
  var authorName = "Anonymous";
  if (currentFact.user.hasOwnProperty('name')) {
    authorName = "- " + currentFact.user.name.first + "  " + currentFact.user.name.last;
  }
  document.getElementById(positionId).innerHTML = authorName;
}
function displayErrorText() {
  document.getElementById('text').innerHTML = "Connection issue: Can't reach API to retrieve cat facts. <br/> Please try again later :,(";
}

// On page Load
document.addEventListener('DOMContentLoaded', function () {

  var factList = void 0; // will store the json object: a list of cat fact objects

  // Request section
  var xhr = new XMLHttpRequest();
  xhr.open("GET", 'https://gist.githubusercontent.com/robinwakeman/b57ef92f04fc9fc77ef0240cca8a6b29/raw/3dcbbc4ac796ea794c38da480dca5bcda10d8494/catfact-copy', true);
  //xhr.open("GET","",true);
  xhr.setRequestHeader("Accept", "application/json");

  // alternatively could have used xhr.onload = function(){};
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      factList = JSON.parse(xhr.responseText); // load the received json object
      var _currentFact = getRandomFactObj(factList, "all");
      displayFactText(_currentFact, 'text');
      displayFactAuthor(_currentFact, 'author');
    } else {
      displayErrorText();
    }
  };
  xhr.send(); // End of request section

  // Buttons section
  document.getElementById('new-quote').onclick = function () {
    var currentFact = getRandomFactObj(factList, "all");
    displayFactText(currentFact, 'text');
    displayFactAuthor(currentFact, 'author');
  };
  document.getElementById('tweet-quote').text = currentFact.text;


});
// Return a random fact object from the given JSON object which contains a list of all facts (json)
function getRandomFactObj(json,prop){
  let random = Math.floor(Math.random()*json[prop].length);
  return json[prop][random];
} 
// Display the text property of the given fact object (factObj) within the html tags specified by the given id (positionId)
function displayFactText(factObj, positionId){ 
  document.getElementById(positionId).innerHTML = factObj.text;
}
// Display the author of the given fact object (factObj) within the html tags specified by the given id (positionId)
function displayFactAuthor(factObj, positionId){
  let authorName = "Anonymous";
  if (factObj.user.hasOwnProperty('name')){
    authorName = factObj.user.name.first; + "  " + factObj.user.name.last;
  }
  document.getElementById(positionId).innerHTML = authorName;
}

// On page Load
document.addEventListener('DOMContentLoaded',function(){ 
    
      let factObjList; // will store the json object: a list of cat fact objects
      
      // Request section
      let xhr = new XMLHttpRequest(); 
      xhr.open("GET",      'https://gist.githubusercontent.com/robinwakeman/b57ef92f04fc9fc77ef0240cca8a6b29/raw/3dcbbc4ac796ea794c38da480dca5bcda10d8494/catfact-copy',true);
      xhr.setRequestHeader("Accept","application/json");         
      
      xhr.onload=function(){ 
        factObjList=JSON.parse(xhr.responseText); // load the received json object
        let factObj = getRandomFactObj(factObjList, "all");
        displayFactText(factObj, 'text');
        displayFactAuthor(factObj, 'author');
      };
      xhr.send(); // End of request section
      
      // Buttons section
      document.getElementById('new-quote').onclick = function(){ 
        let factObj = getRandomFactObj(factObjList, "all");
        displayFactText(factObj, 'text');
        displayFactAuthor(factObj, 'author')
      };
     // document.getElementById('tweet-quote').onclick = function(){
       // let url = 'twitter.com/intent/tweet?text=something%goes%here';
        //window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1, location=0, statusbar=0, menubar=0, resizable=0');
     // }
   
  });
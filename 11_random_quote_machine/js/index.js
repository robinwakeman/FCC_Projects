let factObjList;

function getRandomFactObject(){
  let random = Math.floor(Math.random()*factObjList.all.length);
  return factObjList.all[random];
}

document.addEventListener('DOMContentLoaded',function(){

      req=new XMLHttpRequest();
      req.open("GET",      'https://gist.githubusercontent.com/robinwakeman/b57ef92f04fc9fc77ef0240cca8a6b29/raw/3dcbbc4ac796ea794c38da480dca5bcda10d8494/catfact-copy',true);
      req.setRequestHeader("Accept","application/json");
      req.onload=function(){
        factObjList=JSON.parse(req.responseText);
        var quoteInput = factObjList.all.length;
        document.getElementById('text').innerHTML=quoteInput;
      };
       req.send();
    document.getElementById('new-quote').onclick=function(){
        document.getElementById('text').innerHTML=getRandomFactObject().text;
    };
  });
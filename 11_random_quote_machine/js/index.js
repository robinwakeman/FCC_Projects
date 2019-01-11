  document.addEventListener('DOMContentLoaded',function(){ 
    
    document.getElementById('new-quote').onclick=function(){
      $("#new-quote").css("background","blue");
      
      req=new XMLHttpRequest();
      req.open("GET",'https://gist.githubusercontent.com/robinwakeman/b57ef92f04fc9fc77ef0240cca8a6b29/raw/3dcbbc4ac796ea794c38da480dca5bcda10d8494/catfact-copy',true);
      req.setRequestHeader("Accept","application/json");         
      req.onload=function(){
        json=JSON.parse(req.responseText);
        //document.getElementById('text').innerHTML=JSON.stringify(json);
        //var quoteInput ="<img src='"+json[0].thumbnailUrl+"' alt='hi'>";
        var quoteInput = json.all[0].text;
       // var quoteInput = json.quotes[0].quote;
        document.getElementById('text').innerHTML=quoteInput;
      };
       req.send();
    };
  });
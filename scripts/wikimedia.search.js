'use strict';
(function(){

let language_list = document.querySelector('#language-list');

//Default Language set as English
let options = {
   language : language_list.options[0].value
}

//Set Current Chosen Language
language_list.addEventListener('change',function(event){
 options.language = language_list.options[language_list.selectedIndex].value;
});


//clear contents of page
let clear = function(){
  const docContent = document.querySelector('#content');
  const docTitle = document.querySelector('#docTitle');
  docContent.innerHTML = "";
  docTitle.innerHTML = "";
}

//Search Function
const search = function(input){
  let contentUrl = "https://"+options.language+".wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&titles="+input;

  let loading_progress_bar = document.querySelector(".loading-progressbar");
  loading_progress_bar.style.display = "block";

  //AJAX Request
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parseData(this.responseText);
            loading_progress_bar.style.display = "none";

       }
    };
    xhttp.open("GET", contentUrl, true);
    xhttp.setRequestHeader( 'Api-User-Agent', 'ShriramBalaji/1.0' );
    xhttp.send();
}

//Parsing the response Data
const parseData = function(data){
  const docContent = document.querySelector('#content');
  const docTitle = document.querySelector('#docTitle');
  let parsedData = JSON.parse(data);
  var error_image = document.querySelector('.error-404');
  clear();

//if page not found or is empty
  if(parsedData.query.pages["-1"]!==undefined || parsedData.query.pages[Object.keys(parsedData.query.pages)].extract.length<=0){
    error_image.style.display = "block";
  } else {
    var pages =  parsedData.query.pages;
    var content = pages[Object.keys(pages)].extract;
    var title = pages[Object.keys(pages)].title;
    docTitle.innerHTML= title;
    docContent.innerHTML = content;
    if(error_image!==undefined)
    error_image.style.display = "none";
  }

}


//Invoke Search and Error Handling
const sendQuery = function (initial){
  if(initial == true){
    let defaultQuery = "Wikipedia";
    search(defaultQuery);
    }
  else {
      let query = document.querySelector('#search-input').value;
      if(query.length>0)
        { clear();
          search(query);
        }
      else {
        //handling empty input
        var error_message = document.querySelector('#error-message');
        error_message.innerHTML = "Search Query cannot be Empty!"
        error_message.style.display="block";
        error_message.style.opacity = '1';
        setTimeout(function(){
            error_message.style.opacity = '0';
            error_message.style.display = "none";
          }, 2000);

          }
        }
}

//Submit button action
const submit = document.querySelector('#btn-search');
submit.addEventListener('click',function(){
  sendQuery(false);
});

//handling search for Enter Key Presss
let inputQuery = document.querySelector('#search-input');
inputQuery.addEventListener('keypress',function(event){
if(event.keyCode == 13) {
 sendQuery(false);
}
});

//Initial Search when page Empty
sendQuery(true);

})();

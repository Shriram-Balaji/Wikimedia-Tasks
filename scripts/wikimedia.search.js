'use strict';
(function(){
var input = document.querySelector('#search-input');
input.addEventListener('onkeyup',function(event){
//Enter key to search
  if(event.keyCode== 13) {
      search(input.value);
  }
});

var search = function(query){
  //performing search query.
}

})();

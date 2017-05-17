'use strict';
(function(){
const input = document.querySelector('#search-input');
input.addEventListener('onkeyup',function(event){
//Enter key to search
  if(event.keyCode== 13) {
      search(input.value);
  }
});


const search = function(query,language){
  //performing search query.
}

})();

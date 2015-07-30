// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var matches = [];

  var elementSearch = function(element) {
    if (element.classList && element.classList.contains(className)) {
      console.log(element.classList);
      matches.push(element);
    }
    if (element.childNodes.length > 0) {
      for (var i = 0; i < element.childNodes.length; i++) {
        elementSearch(element.childNodes[i]);
      }
    }
  }

  elementSearch(document.body);
  return matches;
};

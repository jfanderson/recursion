// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringy = function(obj) {
  var str = '';
  if (Array.isArray(obj)) {
    str += '[';
    obj.forEach(function(item) {
      str += stringy(item) + ',';
    });
    str = str.slice(0,-1) + ']';
  } else if (typeof obj === 'string') {
    str += '"' + String(obj) + '"';
  } else {
    str += String(obj);
  }
  return str;
}

var stringifyJSON = function(obj) {
  return '' + stringy(obj);
};

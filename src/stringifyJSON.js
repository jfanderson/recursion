// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringy = function(obj) {
  if (Array.isArray(obj)) {
    var str += '[';
    obj.forEach(function(item) {
      str += stringy(item) + ',';
    });
    str = str.slice(0,-1) + ']';
    return str;
  } else if (typeof obj === 'object') {
    var str += '{';
    for (var key in obj) {
      str += stringy(key) + ':' + stringy(obj[key]) + ',';
    }
    str = str.slice(0,-1) + '}';
    return str;
  } else if (typeof obj === 'string') {
    return '"' + String(obj) + '"';
  } else {
    return String(obj);
  }
}

var stringifyJSON = function(obj) {
  return '' + stringy(obj);
};

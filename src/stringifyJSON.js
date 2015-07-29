// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringy = function(obj) {
  if (obj === null) {
    return 'null';
  } else if (typeof obj === 'string') {
    return '"' + String(obj) + '"';
  } else if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    }
    var str = '[';
    obj.forEach(function(item) {
      str += stringy(item) + ',';
    });
    str = str.slice(0,-1) + ']';
    return str;
  } else if (typeof obj === 'object') {
    var str = '{';
    for (var key in obj) {
      if (obj[key] === undefined || typeof obj[key] === 'function') {
        continue;
      }
      str += stringy(key) + ':' + stringy(obj[key]) + ',';
    }
    if (str[str.length-1] === ',') {
      return str.slice(0,-1) + '}';
    } else {
      return str + '}';
    }
  } else {
    return String(obj);
  }
}

var stringifyJSON = function(obj) {
  return '' + stringy(obj);
};

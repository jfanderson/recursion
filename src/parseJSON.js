// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var ind = 0;
  var tokens = [];

  // creates string when opening quotes (") are encountered by tokenizer
  // (accounts for escape characters)
  var buildStr = function() {
    var str = "";
    while (json[ind] !== '"') {
      if (json[ind] === undefined) {
        throw new SyntaxError("Expected");
      }
      str += json[ind];
      ind++;
    }
    return str;
  }

  // looks for bools, nulls, and numbers to return to tokenizer 
  var buildPrimitive = function() {
    if (json.substr(ind, 4) === 'true') {
      ind += 4;
      return true;
    } else if (json.substr(ind, 5) === 'false') {
      ind += 5;
      return false;
    } else if (json.substr(ind, 4) === 'null') {
      ind += 4;
      return null;
    } else if (/[\d+-.eE]/.test(json[ind])) {
      var numStart = ind;
      ind++;
      while (/[\d+-.eE]/.test(json[ind])) {
        ind++;
      }
      return Number(json.substr(numStart, ind));
    } else {
      throw new SyntaxError('Invalid syntax');
    }
  }

  // tokenize strings, primitives, and syntactical punctuation
  var tokenize = function() {
    while (ind < json.length) {
      if (json[ind] === ' ') {
        ind++;
      } else if (json[ind] === '{') {
        ind++;
        tokens.push({type: 'objOpen'});
      } else if (json[ind] === '}') {
        ind++;
        tokens.push({type: 'objClose'});
      } else if (json[ind] === '[') {
        ind++;
        tokens.push({type: 'arrOpen'});
      } else if (json[ind] === ']') {
        ind++;
        tokens.push({type: 'arrClose'});
      } else if (json[ind] === ',') {
        ind++;
        tokens.push({type: 'comma'});
      } else if (json[ind] === ':') {
        ind++;
        tokens.push({type: 'colon'});
      } else if (json[ind] === '"') {
        ind++;
        tokens.push({type: 'str',
                     value: buildStr()});
      } else {
        tokens.push({type: 'prim',
                     value: buildPrimitive()});
      }
    }
  }

  var buildObj = function() {
    // var obj = {};
    // while (json[ind] !== '}') {
    //   if (json[ind] === undefined) {
    //     throw new SyntaxError('Expected "}"');
    //   }
    //   obj[check()] = check();
    // }
  }

  var buildArr = function() {

  }

  var startParse = function() {
    while (ind < tokens.length) {
      if (tokens[i][type] === 'objOpen') {
        return buildObj();
      } else if (tokens[i][type] === 'arrOpen') {
        return buildArr();
      } else if (tokens[i][type] === 'str' || tokens[i][type] === 'prim') {
        return tokens[i][value];
      } else {
        throw new SyntaxError('Invalid syntax');
      }
    }
  }

  tokenize();
  ind = 0; // reset index for iterating through tokens
  startParse();
};

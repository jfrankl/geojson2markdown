var spacing = "  ";

function getType(obj) {
  var type = typeof obj;
  if (obj instanceof Array) {
    return 'array';
  } else if (type == 'string') {
    return 'string';
  } else if (type == 'boolean') {
    return 'boolean';
  } else if (type == 'number') {
    return 'number';
  } else if (type == 'undefined' || obj === null) {
    return 'null';
  } else {
    return 'hash';
  }
}

function convert(obj, ret) {
  var type = getType(obj);

  switch(type) {
    case 'array':
      convertArray(obj, ret);
      break;
    case 'hash':
      convertHash(obj, ret);
      break;
    case 'string':
      convertString(obj, ret);
      break;
    case 'null':
      ret.push('null');
      break;
    case 'number':
      ret.push(obj.toString());
      break;
    case 'boolean':
      ret.push(obj ? 'true' : 'false');
      break;
  }
}

function convertArray(obj, ret) {
  if (obj.length === 0) {
    ret.push('[]');
  }
  for (var i=0; i<obj.length; i++) {

    var ele     = obj[i];
    var recurse = [];
    convert(ele, recurse);

    for (var j=0; j<recurse.length; j++) {
      ret.push((j == 0 ? "- " : spacing) + recurse[j]);
    }
  }
}

function convertHash(obj, ret) {
  for (var k in obj) {
    var recurse = [];
    if (obj.hasOwnProperty(k)) {
      var ele = obj[k];
      convert(ele, recurse);
      var type = getType(ele);
      if (type == 'number' || type == 'boolean') {
        ret.push(`${k}: ${recurse[0]}`);
      } else if (type == 'string' || type == 'null') {
      	ret.push(`${k}: "${recurse[0]}"`);
      } else {
        ret.push(k + ': >-\n' + spacing + JSON.stringify(ele));
      }
    }
  }
}

function convertString(obj, ret) {
  ret.push(obj);
}

function json2yaml(obj) {
  if (typeof obj == 'string') {
    obj = JSON.parse(obj);
  }

  var ret = [];
  convert(obj, ret);
  return ret.join("\n");
};

module.exports = json2yaml;
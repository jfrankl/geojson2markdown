function emptyObject(obj) {
  Object.keys(obj).forEach(k => delete obj[k])
}

module.exports = emptyObject;
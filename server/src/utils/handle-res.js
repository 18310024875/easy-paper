function getType(obj) {
  return Object.prototype.toString.call(obj).toLocaleLowerCase().slice(8, -1);
}

function sendSuccess(res, data) {
  res.send({
    code: 200,
    data
  })
}

function sendWarning(res, warn, code) {
  res.send({
    code: code || 333,
    data: warn || '***warning***'
  })
}

function sendError(res, err, status) {
  res.status(status || 444)
  res.send({
    code: status || 444,
    data: err.message || err || '***error***'
  })
}

module.exports = {
  getType,
  sendSuccess,
  sendWarning,
  sendError
}
const { Requests } = require('./utils/requests')

module.exports = {
  Opr: function (opt) {
    return new Requests(opt)
  }
}

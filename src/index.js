const { Profile } = require('./utils/profile')

module.exports = {
  Opr: function (opt) {
    return new Profile(opt)
  }
}

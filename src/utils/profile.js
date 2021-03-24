const fetch = require('node-fetch')
const { Server } = require('./servers')

function Profile (opt = {}) {
  this.__opt = opt || {
    username: null,
    lang: null,
    servers: []
  }

  this.__debug = true

  this.__opt.servers = opt.servers || []
  this.__responses = []

  // initialize server
  this.servers = new Server(this.__opt.servers)

  this.getProfileFromRepository = (name) => {
    if (!name) return this.__debug === true ? Promise.reject(new Error('Server does not exists')) : Promise.resolve({})

    const __server = this.servers.getServerByName(name)

    return new Promise((resolve, reject) => {
      fetch(`${__server.url}/${this.__opt.username}/${__server.repository || this.servers.getRepositoryName()}/${__server.head}/index${!this.__opt.lang || this.__opt.lang === null ? '' : `-${this.__opt.lang}`}.json`)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => {
        // for bitbucket server
          const __errorObject = Object.values(error)
          if (__errorObject.length) {
            if (__errorObject[0].indexOf('invalid') >= 0) return this.__debug === true ? reject(new Error('Invalid JSON Response')) : resolve({})
          }
          return resolve(error)
        })
    })
  }

  this.getRawResponses = () => {
    return this.__responses
  }

  this.getResponses = () => {
    return this.__responses.map(cur => cur.response)
  }

  // read profile from all servers
  // failed silently when debugging is disabled
  this.read = () => {
    this.__responses = this.servers.getServers().map((cur, index) => {
      const __cur = { ...cur }
      __cur.response = this.__debug ? this.getProfileFromRepository(__cur.name) : this.getProfileFromRepository(__cur.name).catch(err => { return { error: err } })
      return __cur
    })
    return this
  }

  this.getResponse = () => {
    return Promise.any(this.getResponses())
  }

  this.getAllResponses = () => {
    return Promise.allSettled(this.getResponses()).then(res => res.map(cur => cur.value !== undefined && typeof cur.value !== 'undefined' ? cur.value : {}))
  }

  this.getResponseFromRepository = name => {
    const __res = this.__responses.filter(cur => cur.name === name)
    return __res.length ? __res[0].response : Promise.reject(new Error('Empty Response'))
  }

  this.debug = (val) => {
    this.__debug = val === true
    return this.__debug
  }

  return this
}

module.exports = {
  Profile
}

const { servers: defaultServers, repository: defaultRepository } = require('../helpers/servers')

function Server (opts = []) {
  this.__repositoryName = defaultRepository
  this.__servers = opts.length || defaultServers

  this.getServers = () => {
    return this.__servers
  }

  this.getServerByName = (serverName) => {
    return this.__servers.filter((el) => el.name === serverName)[0]
  }

  this.getRepositoryName = () => {
    return this.__repositoryName
  }
}

module.exports = {
  Server
}

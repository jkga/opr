const { servers: defaultServers, repository: defaultRepository } = require('../helpers/servers')

function Server (opts = [], defaultVariables = {}) {
  this.__repositoryName = defaultRepository
  this.__servers = opts.length || defaultServers
  this.__defaultVariables = defaultVariables || {}

  this.__init = () => {
    for (const repo in this.__defaultVariables) {
      for (const vars of Object.entries(this.__defaultVariables[repo])) {
        if (!vars[0]) return
        this.setServerVariable(repo, vars[0], vars[1] || null)
      }
    }
    return this
  }

  this.getServers = () => {
    return this.__servers
  }

  this.setServers = (val) => {
    this.__servers = val
    return this
  }

  this.getServerByName = (serverName) => {
    return this.__servers.filter((el) => el.name === serverName)[0]
  }

  this.getRepositoryName = () => {
    return this.__repositoryName
  }

  this.setServerVariable = (repositoryName, variableName, value) => {
    const __selectedServer = this.getServerByName(repositoryName)
    if (!__selectedServer) return
    __selectedServer[variableName] = __selectedServer[variableName] || null
    __selectedServer[variableName] = value
    return this.setServers(this.getServers().map(cur => cur.name === repositoryName ? __selectedServer : cur))
  }

  return this.__init()
}

module.exports = {
  Server
}

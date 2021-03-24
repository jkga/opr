module.exports = {
  servers: [
    {
      name: 'github',
      url: 'https://raw.githubusercontent.com',
      head: 'HEAD'
    },
    {
      name: 'gitlab',
      url: 'https://gitlab.com',
      head: '-/raw/HEAD'
    },
    {
      name: 'bitbucket',
      url: 'https://bitbucket.com',
      head: 'raw/HEAD'
    }
  ],
  repository: 'about.me'
}

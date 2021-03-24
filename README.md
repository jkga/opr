# OPR (Online Profile Reader)
Read your profile (json-resume) across various version control platforms such as github, gitlab, bitbucket and more.   

[![JavaScript Style Guide](https://img.shields.io/badge/Code%20Style-Standard%20-green?style=for-the-badge&logo=javascript)](https://github.com/standard/standard) [![JSON RESUME](https://img.shields.io/badge/profile-JSON%20RESUME%20-yellow?style=for-the-badge&logo=json)](http://jsonresume.org)

## Installing Dependency
### Installation via npm
```bash
  npm i opr
```
   
### Installation via yarn
```bash
  yarn add opr
```

## Importing module
### CommonJS
```bash
  const { Opr } = require ('opr')
```
### ES Modules
```bash
  import { Opr } from 'opr'
```
   

## Basic Usage
```js
const { Opr } = require('./index')

// initialize Opr
const opr = new Opr({ username: 'yourUsername' })

// enable or disable debugging using the debug function
opr.debug(true)

// read profile from default platforms (github, bitbucket)
opr.read()

// return the first successfull result in JSON format
// you can also link `getResponse` in the chain
// ex. opr.read().getResponse ()
opr.getResponse().then(res => {
  console.log(res)
}).catch(e => {
  console.log('No profile found in all servers')
})
```

## Options
Parameters that you can use when defining your OPR
```js
  // sample option with a new server
  const opr = new Opr({ 
    username: 'yourUsername',
    lang: 'ph',
    servers: [
      {
        name: 'github',
        url: 'https://raw.githubusercontent.com',
        head: 'master',
        repository: 'about.me' // optional
      },
    ]
  })
```
   
## Advanced Usage

### OPR methods in a glance
:bulb: List of available functions that you can call
```js
  const opr = new Opr({ ...options }) // initialize   
  opr.debug(true) // boolean: true | false   
  opr.getResponseFromRepository(repositoryName) // repositoryName: 'github' | 'bitbucket'   
  opr.getResponse () // view first successfull response   
  opr.getResponses() // view responses from all servers [Promise { <pending> }]
  opr.getRawResponses() // raw response
```
### Raw Response
```js
  // view all raw responses from all the servers
  opr.getRawResponses()
```
```json
  // SAMPLE RESPONSE
  [
    {
      name: 'github',
      url: 'https://raw.githubusercontent.com',
      head: 'master',
      repository: '',
      response: Promise { <pending> }
    },
    {
      name: 'bitbucket',
      url: 'https://bitbucket.com',
      head: 'raw/HEAD',
      response: Promise { <pending> }
    }
  ]
```

### Individual Response
```js
  // read result from github server
  // allowed value : github, bitbucket
  opr.getResponseFromRepository('github').then(res => console.log(res)).catch(e => {})
```

```json
  // SAMPLE RESPONSE
  // returns profile found in github server only
  {
  basics: {
    name: 'John Doe',
    label: 'Programmer',
    picture: 'https:...',
    ...
  }
```

### Testing
```js 
  // ex. npm test potvillage
  npm test yourUsernameHere 
```
> :bulb: You must have an existing account in github or bitbucket to make it work. For setting-up your own profile please follow this [link](https://github.com/jkga/me#quick-setup)

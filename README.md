# OPR (Online Profile Reader)
Read your profile (json-resume) across various version control platforms such as :white_check_mark: Github   :white_check_mark: Gitlab   :white_check_mark: Bitbucket and more.   

[![JavaScript Style Guide](https://img.shields.io/badge/Code%20Style-Standard%20-green?style=for-the-badge&logo=javascript)](https://github.com/standard/standard) [![JSON RESUME](https://img.shields.io/badge/profile-JSON%20RESUME%20-yellow?style=for-the-badge&logo=json)](http://jsonresume.org)

   
> :bulb: If you are using this package for the first time, make sure you have a JSON Resume in your repository. Here is a short [article](https://dev.to/jkga/read-your-resume-from-github-gitlab-and-bitbucket-all-at-once-part-1-1b4g) to help you get started.
## Installing Dependency
### Installation via npm
```bash
  npm install @jkga/opr
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

// read profile from default platforms (github, gitlab, bitbucket)
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
    ],
  })
```

```js
  // if there is no server specified, this will be the default value
  // excerpt from `./src/helpers/servers.js`
  {
    [{

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
```
   
## Advanced Usage
### Overriding and Writing Server Variables
:bulb: Allows to change different information for each repository
```js
  // USAGE
  // !IMPORTANT: This will change the username for bitbucket server only.
  // Default username for github will remain unchanged
  const opr = new Opr({
    username: 'potvillage',
    default: {
      bitbucket: {
        username: 'potvillage2'
      },
    }
  })
```
```js
  // SAMPLE
  {
    default: {
      github: {
        username: 'your_username',
        repository: 'your_repository'
      },
    }
  }
```

### OPR methods in a glance
:bulb: List of available methods available
```js
  const opr = new Opr({ ...options }) // initialize   
  opr.debug(true) // boolean: true | false   
  opr.getResponseFromRepository(repositoryName) // repositoryName: 'github' | 'bitbucket'   
  opr.getResponse () // return first successfull response
  opr.getResponses() // view responses from all servers [Promise { <pending> }]
  opr.getRawResponses() // raw response
```
### Raw Response
```js
  // view all raw responses from all the servers
  opr.getRawResponses()
```

```js
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
  // allowed value : github, gitlab, bitbucket
  opr.getResponseFromRepository('github').then(res => console.log(res)).catch(e => {})
```

```js
  // SAMPLE RESPONSE
  // returns profile found in github server only
  {
    basics: {
      name: 'John Doe',
      label: 'Programmer',
      picture: 'https:...',
      ...
    }
  }
```

## CLI
1.) Install via npm or yarn
```bash
  npm install @jkga/opr -g  
``` 
2.) Lookup
```bash
  // ex. opr potvillage
  opr <yourUsernameHere>
```


## Local Testing
1.) Clone the repository
```bash
  git clone https://github.com/jkga/opr.git
```
2.) Go inside the directory
```bash
  cd opr
```
3.) Install Dependencies
```bash
  npm install
```
4.) Test lookup
```js 
  // ex. npm run lookup potvillage
  npm run lookup yourUsernameHere 
```
> :bulb: You must have an existing account in github or bitbucket to make it work. For setting-up your own profile please follow this [link](https://github.com/jkga/me#quick-setup)

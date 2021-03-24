#!/usr/bin/env node
const { Opr } = require('./index')

if (process.argv.length <= 2) throw new Error('No Username Specified')

// initialize
const opr = new Opr({ username: process.argv[2] })

// read profile
opr.read().getResponse().then(res => {
  console.log(res)
}).catch(e => {
  console.log({ message: 'No profile found in all servers' })
})

#!/usr/bin/env node

const fetch = require('node-fetch')
const program = require('commander')
const fs = require('fs')
const util = require('util')

const writeFile = util.promisify(fs.writeFile)

const fail = message => {
  console.log(message)
  process.exit(1)
}

program
  .version('1.0.0', '-v, --version')
  .option('-t, --token <token>', 'gitea access token')
  .option('-h, --host <host>', 'gitea host url')
  .option('-r, --repo <repository>', 'secret respository')
  .option('-k, --key <key>', 'secret key')
  .option('-o, --output <file>', 'output to file instead of stdout')
  .parse(process.argv)

if (program.token === undefined)
  fail('Token is required')

if (program.repo === undefined)
  fail('Repository url is required')

if (program.key === undefined)
  fail('Secret key is required')

if (program.host === undefined)
  fail('Host is required')

async function main () {
  const response = await fetch(`https://${program.host}/api/v1/repos/${program.repo}/raw/${encodeURIComponent(program.key)}`, {
    method: 'GET',
    headers: { 
      'Authorization': `token ${program.token}`,
      'Accept': 'application/json'
    }
  })

  const data = await response.text()

  if (!response.ok) {
    fail(`${response.status} ${response.statusText}`)
  }

  if (program.output) {
    try {
      await writeFile(program.output, data, 'utf8')
    } catch (e) {
      fail('Cannot write to file')
    }
  } else {
    console.log(data)
  }
}

main().catch(error => {
  fail(error.message)
})


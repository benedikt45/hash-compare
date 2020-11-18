#!/usr/bin/env node

const crypto = require('crypto')
const fs = require('fs')
const yargs = require('yargs')

const options = yargs.usage('Usage: -a <algorithm> -f <file> -h <hex hash>')
    .options('f', {alias: 'file', description: 'path to file', type: 'string', demandOption: true})
    .options('a', {alias: 'algorithm', description: 'hash algorithm', type: 'string', demandOption: true})
    .options('h', {alias: 'hash', description: 'hash to compare', type: 'string', demandOption: false})
    .argv

let bufferData = fs.readFileSync(options.file);
const hash = crypto.createHash(options.algorithm).update(bufferData).digest('hex')
console.log(`Calc hash: ${hash}`)
if (options.h) {
  if (hash === options.hash) {
    console.log('Hashes ==')
  } else {
    console.log('Hashes !=')
  }
}
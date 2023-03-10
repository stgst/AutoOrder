const fs = require('node:fs')
const path = require('node:path')

const { Routes, Presence } = require('discord.js')
const { rest, REST } = require('@discordjs/rest')
require('dotenv').config()
const { clientId } = require('./config.json')
const token = process.env.TOKEN

var commands = []
var commandpath = path.join(__dirname, 'commands')
var Files = fs.readdirSync(commandpath).filter(file => file.endsWith('.js'));

for( var file of Files){
    var filepath = path.join(commandpath, file)
    var command = require(filepath)
    commands.push(command.data.toJSON())
}

new REST({version: '10'}).setToken(token)
.put(Routes.applicationCommands(clientId), {body: commands})
.then(console.log('Deplouy Commands Successful'))
.catch(console.error)
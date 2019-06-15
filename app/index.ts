const path = require('path')
const fs = require('fs')
export const fetch = require('node-fetch')
require('dotenv').config()
export const Discord = require('discord.js')
export const { prefix } = require('../config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()

client.once('ready', () => {
  console.log('Ready!')
})

const commandFiles = fs
  .readdirSync(__dirname + '/commands')
  .filter((file: any) => file.endsWith('.ts'))

commandFiles.map((file: any) => {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
})

client.on('message', (message: any) => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return
  }
  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) {
    return
  }

  const command = client.commands.get(commandName)

  if (command.args && !args.length) {
    let reply = `You didn't provide the necessary arguments, ${message.author}`

    if (command.usage) {
      reply += `\n The proper usage would be: \`${prefix}${command.name} ${
        command.usage
      }\``
    }

    return message.channel.send(reply)
  }

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('there was an error with the command you gave me.')
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)

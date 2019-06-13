import { prefix } from '../index'

module.exports = {
  name: 'help',
  description:
    'List all the commands available or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute(message: any, args?: any) {
    const data: any[] = []
    const { commands } = message.client

    if (!args.length) {
      data.push("Here's alist of all my commands:")
      data.push(commands.map((command: any) => command.name).join(', '))
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      )

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
        })
        .catch((error: any) => {
          console.error(
            `Could not send help DM to ${message.author.tag}. \n`,
            error
          )
          message.reply(
            "it seems like I can't DM you. Do you have DMs disabled?"
          )
        })
    }
    const name = args[0].toLocaleLowerCase()
    const command =
      commands.get(name) ||
      commands.find((c: any) => c.aliases && c.aliases.includes(name))

    if (!command) {
      return message.reply("that's not a valid command!")
    }

    data.push(`--Name:-- ${command.name}`)
    if (command.aliases) data.push(`--Aliases:-- ${command.aliases.join(', ')}`)
    if (command.description)
      data.push(`--Description:-- ${command.description}`)
    if (command.usage)
      data.push(`--Usage:-- ${prefix}${command.name} ${command.usage}`)

    data.push(`--Cooldown:-- ${command.cooldown || 3} second(s)`)

    message.channel.send(data, { split: true })
  }
}

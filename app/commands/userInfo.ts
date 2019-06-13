module.exports = {
  name: 'user-info',
  description: 'Display basic info about yourself.',
  execute(message: any, args: string[]) {
    message.channel.send(
      `Your username is ${message.author.username}\nYour ID is: ${
        message.author.id
      }`
    )
  }
}

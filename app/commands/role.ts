module.exports = {
  name: 'role',
  description: 'Set the role of a user.',
  args: true,
  usage: '<user> <role>',
  execute(message: any, args: string[]) {
    const role = message.guild.roles.find((role: any) => role.name === args[1])
    const user = message.mentions.members.first()

    if (!message.member.roles.find((r: any) => r.name === 'BOSS')) {
      return message.channel.send(
        `Uuuh, you don't have the right permissions mate...`
      )
    }
    user.addRole(role).catch(console.error)
  }
}

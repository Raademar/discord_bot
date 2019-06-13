module.exports = {
  name: 'leaders',
  description: 'Display info of Guild Master, Officers and Class Leaders.',
  aliases: ['bosses', 'chiefs'],
  execute(message: any, args?: any) {
    const targets: string[] = ['BOSS, Officer, Class Leader']
    const result = message.guild.members
      .filter((member: any) => {
        return member.roles.find('name', () => {
          targets.map((target: string) => target)
        })
      })
      .map((member: any) => member.user.username)
    console.log(result)
  }
}

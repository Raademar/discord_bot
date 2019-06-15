import { fetch } from '../index'
import { Discord } from '../index'
// import BLIZZARD_API_PREFIX from '../../config.json'

let guild: string

const getLeaderboard = async (array: any, message: any) => {
  const mappedArray = array.members
    .map((member: any) => {
      return {
        name: member.character.name,
        level: member.character.level
      }
    })
    .sort(
      (
        a: { name: string; level: number },
        b: { name: string; level: number }
      ) => b.level - a.level
    )
    .slice(0, 10)

  const leaderboardEmbed: any = {
    color: 0x0099ff,
    title: `Leveling leaderboard of ${guild}`,
    fields: mappedArray.map((item: any) => {
      return {
        name: item.name,
        value: item.level
      }
    })
  }
  console.log(leaderboardEmbed)

  message.channel.send({ embed: leaderboardEmbed })
}

module.exports = {
  name: 'leaderboard',
  aliases: ['stats', 'statistics', 'levels', 'lvls'],
  args: true,
  async execute(message: any, args: string[]) {
    guild = args[0]
    if (args.length > 1) {
      guild = args.join(' ')
      console.log(guild)
    }
    await fetch(
      `https://eu.api.blizzard.com/wow/guild/Stormscale/${encodeURIComponent(
        guild
      )}?fields=members&locale=en_US&access_token=${
        process.env.BLIZZARD_ACCESS_TOKEN_US
      }`
    )
      .then((res: any) => res.json())
      .then((data: any) => {
        console.log(data)
        getLeaderboard(data, message).catch(error => console.error(error))
      })
      .catch((err: any) => console.error(err))
  }
}

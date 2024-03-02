import { SlashCommandBuilder } from 'discord.js';

//コマンドの名前
const name = "time";
//コマンドの説明
const description = "時間を教えてくれる"

const command = {
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description),

  play( message ) {
    message.reply(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));
  },
};
export default command;
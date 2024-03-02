import { SlashCommandBuilder } from 'discord.js';

//コマンドの名前
const name = "hello";
//コマンドの説明
const description = "「こんにちは！〇〇さん！」と返事する"

const command = {
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description),

  play( message ) {
    message.reply(`こんにちは！${message.user.globalName}さん！`);
  },
};
export default command;
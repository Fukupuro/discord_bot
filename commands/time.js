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
    console.log(message)
    const date = new Date(new Date().getTime() + (new Date().getTimezoneOffset() + (9 * 60)) * 60000);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    const hour = date.getHours();
    const minute = date.getMinutes();
    
    message.reply(`今は、${year}年${month}月${day}日(${weekday})${hour}時${minute}分だよ！`);
  },
};
export default command;
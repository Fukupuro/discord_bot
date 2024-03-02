import dotenv from "dotenv"
dotenv.config();
const token = process.env['token'];

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// commandsフォルダからjs拡張子のファイルを取得
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.split(".").slice(-1)[0] == "js");

commandFiles.forEach(file => {
  const filePath = path.join(commandsPath, file);
  import(filePath)
    .then(module => {
      client.commands.set(module.default.data.name, module.default);
    })
    .catch(err => console.error(`${err}\n${filePath}コマンドは必要なプロパティが存在しません`))
});

// コマンドが送られてきた際の処理
client.on(Events.InteractionCreate, async message => {
    // コマンドでなかった場合は処理せずにreturn
  if (!message.isChatInputCommand()) return;

  const command = message.client.commands.get(message.commandName);

    // 一致するコマンドがなかった場合
  if (!command) {
    message.reply({ content: ` ${message.commandName} というコマンドは存在しません。`, ephemeral: true });
    return;
  }

  try {
    command.play(message);
  } catch (error) {
    console.error(error);
    await message.reply({ content: 'コマンドを実行中にエラーが発生しました。', ephemeral: true });
  }
});

client.on('ready', () => {
  console.log(`${client.user.username} is starting`);
});

//Discordにログイン
client.login(token);
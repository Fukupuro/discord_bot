import dotenv from "dotenv"
dotenv.config();

const guild_id = process.env['guild_id'];
const application_id = process.env['application_id']
const token = process.env['token'];

import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// commandsフォルダからjs拡張子のファイルを取得// commandsフォルダからjs拡張子のファイルを取得
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.split(".").slice(-1)[0] == "js");


// commandのデータをJSON形式に変換し格納
const commands = [];
for (const file of commandFiles) {
  await import(`./commands/${file}`)
    .then(command => commands.push(command.default.data.toJSON()));
}

const rest = new REST({ version: '10' }).setToken(token);

// コマンドをデプロイする
(async () => {
  try {
    console.log(`${commands.length}個の/コマンドをデプロイします...`);
    // コマンドを追加
    const data = await rest.put(
			Routes.applicationGuildCommands(application_id, guild_id),
			{ body: commands },
		);

    console.log(`${data.length}個の/コマンドをデプロイしました！`);
  } catch (error) {
    console.error(error);
  }
})();

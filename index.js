const { Client, Events, GatewayIntentBits } = require('discord.js');

//dotenv
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;

//importação dos comandos
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandsFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command)
	} else {
		console.log(`Esse comando em ${file.path} está com "data" ou "execute" ausentes!`)
	}
}

//login do Bot
client.once(Events.ClientReady, c => {
	console.log(`Login realizado como ${c.user.tag}`);
});

client.login(TOKEN);

//listener de interações com o bot
client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand ()) return
	console.log(interaction) 
})
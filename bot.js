const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("!playtime")) {
        const playerID = message.content.split(" ")[1];

        if (!playerID) {
            return message.reply("Please provide a valid Roblox UserID.");
        }

        try {
            const response = await axios.get(`https://your-replit-url.repl.co/getPlaytime?userId=${playerID}`);
            const playtime = response.data.playtime;

            message.reply(`Player ${playerID} has played for ${playtime} minutes.`);
        } catch (error) {
            console.error("Error fetching playtime:", error);
            message.reply("Sorry, I couldn't find that player's playtime.");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

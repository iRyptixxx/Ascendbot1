const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Initialize Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Example Command: !playtime
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!playtime')) {
    const playerID = message.content.split(' ')[1];

    if (!playerID) {
      return message.reply('Please provide a valid Roblox UserID.');
    }

    try {
      const response = await axios.get(`https://0518bc5f-2023-4c12-a9fc-d1e1da71ca6d-00-3dbrv3kshfbvk.spock.replit.dev/getPlaytime?userId=${playerID}`);
      const playtime = response.data.playtime;

      message.reply(`Player ${playerID} has played for ${playtime} minutes.`);
    } catch (error) {
      console.error('Error fetching playtime:', error);
      message.reply('Sorry, I couldn\'t fetch that player\'s playtime.');
    }
  }
});

// Start the server and make sure bot runs
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Start express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Login the bot using your Discord Token
const token = process.env.DISCORD_TOKEN;
client.login(token);

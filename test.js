const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  GuildMember,
} = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, () => {
  console.log("Ready!");
  console.log("Ready!");
  client.destroy();
});

client.login(token);

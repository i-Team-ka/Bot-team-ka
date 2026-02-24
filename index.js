const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("messageCreate", async (message) => {
  if (message.content === "!متجر") {

    const button = new ButtonBuilder()
      .setCustomId("open_shop")
      .setLabel("فتح المتجر")
      .setStyle(ButtonStyle.Primary); // 🔵 أزرق

    const row = new ActionRowBuilder().addComponents(button);

    await message.reply({
      content: "🛒 **متجر السيرفر**\nاضغط الزر لفتح المتجر",
      components: [row]
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "open_shop") {
    await interaction.reply({
      content: "🚧 المتجر تحت الصيانة\n\n𝐁𝐲 : 𝐡𝐚𝐬𝐨𝐨𝐧𝐤𝐚",
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);

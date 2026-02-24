const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle,
  Events
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// لما البوت يشتغل
client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// امر !متجر
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  if (message.content === "!متجر") {

    const button = new ButtonBuilder()
      .setCustomId("open_shop")
      .setLabel("فتح المتجر")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await message.reply({
      content: "🛒 **متجر السيرفر**\nاضغط الزر لفتح المتجر",
      components: [row]
    });
  }
});

// عند الضغط على الزر
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "open_shop") {
    await interaction.reply({
      content: "🚧 المتجر تحت الصيانة\n\n𝐁𝐲 : 𝐡𝐚𝐬𝐨𝐨𝐧𝐤𝐚",
      ephemeral: true
    });
  }
});

// تسجيل الدخول
client.login(process.env.TOKEN);

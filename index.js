const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const token = process.env.TOKEN;
const clientId = '1389052667665322215';
const guildId = '1368161093918396416';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

const commands = [
  new SlashCommandBuilder()
    .setName('متجر')
    .setDescription('عرض متجر السيرفر')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log('تم تسجيل أمر /متجر');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'متجر') {

    const embed = new EmbedBuilder()
      .setTitle('🛒 متجر السيرفر')
      .setDescription(`
🚧 المتجر تحت الصيانة حالياً

𝐛𝐲 : 𝐡𝐚𝐬𝐨𝐨𝐧𝐤𝐚  
𝐨𝐰𝐧𝐞𝐫 𝐭𝐡𝐞 𝐬𝐞𝐫𝐯𝐞𝐫:

💡 عندكم اقتراحات؟
افتحوا تكت 🎫  
أو أرسلوها من النظام الجديد 📩
      `)
      .setColor('#ff9900');

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(token);

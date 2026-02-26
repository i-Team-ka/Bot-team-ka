const { 
  Client, 
  GatewayIntentBits, 
  SlashCommandBuilder, 
  Routes, 
  REST 
} = require('discord.js');
const fs = require('fs');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = '1389052667665322215';
const GUILD_ID = '1368161093918396416';

// 👑 الاثنين اللي يتحكمون
const OWNERS = [
  '1269710725560008740',
  '1339967472186425366'
];

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// ===== تسجيل الأوامر =====
const commands = [

  new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn member')
    .addUserOption(option =>
      option.setName('user').setDescription('Select user').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason').setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Send private message to member')
    .addUserOption(option =>
      option.setName('user').setDescription('Select user').setRequired(true))
    .addStringOption(option =>
      option.setName('message').setDescription('Message').setRequired(true)
    )

].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );
})();

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (!OWNERS.includes(interaction.user.id)) {
    return interaction.reply({ content: '❌ Not allowed.', ephemeral: true });
  }

  // ===== WARN =====
  if (interaction.commandName === 'warn') {

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    let warnings = {};
    if (fs.existsSync('./warnings.json')) {
      warnings = JSON.parse(fs.readFileSync('./warnings.json'));
    }

    if (!warnings[user.id]) warnings[user.id] = 0;
    warnings[user.id]++;

    fs.writeFileSync('./warnings.json', JSON.stringify(warnings, null, 2));

    try {
      await user.send(`⚠️ تم تحذيرك في سيرفر **${interaction.guild.name}**

📌 السبب: ${reason}
📊 عدد تحذيراتك: ${warnings[user.id]}`);
    } catch {
      return interaction.reply({ 
        content: '⚠️ تم التحذير لكن ما قدرت ارسل له خاص.', 
        ephemeral: true 
      });
    }

    return interaction.reply({ 
      content: `✅ ${user.tag} warned.\nTotal warnings: ${warnings[user.id]}`, 
      ephemeral: true 
    });
  }

  // ===== DM =====
  if (interaction.commandName === 'dm') {

    const user = interaction.options.getUser('user');
    const message = interaction.options.getString('message');

    try {
      await user.send(`📩 رسالة من الإدارة في **${interaction.guild.name}**

${message}`);
      return interaction.reply({ content: '✅ DM sent.', ephemeral: true });
    } catch {
      return interaction.reply({ content: '❌ Cannot send DM.', ephemeral: true });
    }
  }

});

client.login(TOKEN);

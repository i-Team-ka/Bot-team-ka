const { 
  Client, 
  GatewayIntentBits, 
  SlashCommandBuilder, 
  Routes, 
  REST, 
  EmbedBuilder 
} = require('discord.js');
const fs = require('fs');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = '1389052667665322215';
const GUILD_ID = '1368161093918396416';
const OWNER_ID = '1269710725560008740';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

// ===== تسجيل الأوامر =====

const commands = [

  new SlashCommandBuilder()
    .setName('broadcast')
    .setDescription('Send announcement')
    .addChannelOption(option =>
      option.setName('channel').setDescription('Select channel').setRequired(true))
    .addStringOption(option =>
      option.setName('message').setDescription('Message').setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Send DM')
    .addUserOption(option =>
      option.setName('user').setDescription('Select user').setRequired(true))
    .addStringOption(option =>
      option.setName('message').setDescription('Message').setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn member')
    .addUserOption(option =>
      option.setName('user').setDescription('Select user').setRequired(true))
    .addStringOption(option =>
      option.setName('reason').setDescription('Reason').setRequired(true)
    )

].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );
})();

// ===== تشغيل البوت =====

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.user.id !== OWNER_ID) {
    return interaction.reply({ content: '❌ Not allowed.', ephemeral: true });
  }

  // ===== BROADCAST =====
  if (interaction.commandName === 'broadcast') {
    const channel = interaction.options.getChannel('channel');
    const message = interaction.options.getString('message');

    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setTitle('📢 KA Announcement')
      .setDescription(message)
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    return interaction.reply({ content: '✅ Broadcast sent.', ephemeral: true });
  }

  // ===== DM =====
  if (interaction.commandName === 'dm') {
    const user = interaction.options.getUser('user');
    const message = interaction.options.getString('message');

    try {
      await user.send(`📩 **KA Message**\n\n${message}`);
      return interaction.reply({ content: '✅ DM sent.', ephemeral: true });
    } catch {
      return interaction.reply({ content: '❌ Cannot send DM.', ephemeral: true });
    }
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

    return interaction.reply(`⚠️ ${user.tag} warned.\nTotal warnings: ${warnings[user.id]}`);
  }

});

client.login(TOKEN);

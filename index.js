const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder,
  ChannelType
} = require('discord.js');

const token = process.env.TOKEN;
const clientId = '1389052667665322215';
const guildId = '1368161093918396416';
const ownerId = '1269710725560008740';

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ستايل')
    .setDescription('Create KA style server')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(clientId, guildId),
    { body: commands }
  );
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ستايل') {

    if (interaction.user.id !== ownerId) {
      return interaction.reply({ content: '❌ Only owner can use this.', ephemeral: true });
    }

    await interaction.reply({ content: '⚙️ Creating KA Style...', ephemeral: true });

    // حذف كل القنوات
    for (const channel of interaction.guild.channels.cache.values()) {
      await channel.delete().catch(() => {});
    }

    // إنشاء كاتيجوري 1
    const community = await interaction.guild.channels.create({
      name: '╔═══════『 𝐊𝐀 𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘 』═══════╗',
      type: ChannelType.GuildCategory
    });

    await interaction.guild.channels.create({
      name: '💬・𝐊𝐀-chat',
      type: ChannelType.GuildText,
      parent: community.id
    });

    await interaction.guild.channels.create({
      name: '📢・𝐊𝐀-announcements',
      type: ChannelType.GuildText,
      parent: community.id
    });

    // كاتيجوري 2
    const support = await interaction.guild.channels.create({
      name: '╔═══════『 𝐊𝐀 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 』═══════╗',
      type: ChannelType.GuildCategory
    });

    await interaction.guild.channels.create({
      name: '🎫・𝐊𝐀-tickets',
      type: ChannelType.GuildText,
      parent: support.id
    });

    // كاتيجوري 3
    const voice = await interaction.guild.channels.create({
      name: '╔═══════『 𝐊𝐀 𝐕𝐎𝐈𝐂𝐄 』═══════╗',
      type: ChannelType.GuildCategory
    });

    await interaction.guild.channels.create({
      name: '🔊・𝐊𝐀-Voice 1',
      type: ChannelType.GuildVoice,
      parent: voice.id
    });

    await interaction.followUp({ content: '✅ KA Style Created!', ephemeral: true });
  }
});

client.login(token);

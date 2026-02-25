const { 
  Client, 
  GatewayIntentBits, 
  REST, 
  Routes, 
  SlashCommandBuilder 
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
    .setName('تعديل')
    .setDescription('Replace DC with KA in all channels')
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

  if (interaction.commandName === 'تعديل') {

    if (interaction.user.id !== ownerId) {
      return interaction.reply({ content: '❌ Only you can use this.', ephemeral: true });
    }

    await interaction.reply({ content: '⚙️ Replacing DC with KA...', ephemeral: true });

    const channels = interaction.guild.channels.cache;

    for (const channel of channels.values()) {
      if (channel.name.includes('𝐃𝐂')) {
        const newName = channel.name.replace(/𝐃𝐂/g, '𝐊𝐀');
        await channel.setName(newName).catch(() => {});
      }
    }

    await interaction.followUp({ content: '✅ Done! All DC changed to KA.', ephemeral: true });
  }
});

client.login(token);

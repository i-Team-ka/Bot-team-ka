const { SlashCommandBuilder } = require('discord.js');

const OWNER_ID = '1269710725560008740'; // آيديك

module.exports = {
  data: new SlashCommandBuilder()
    .setName('broadcast')
    .setDescription('Send DM to all members')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('Message to broadcast')
        .setRequired(true)
    ),

  async execute(interaction) {

    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: '❌ You are not allowed.',
        ephemeral: true
      });
    }

    await interaction.reply({ content: '📢 Broadcasting...', ephemeral: true });

    const message = interaction.options.getString('message');
    const members = await interaction.guild.members.fetch();

    let success = 0;
    let failed = 0;

    for (const member of members.values()) {
      if (member.user.bot) continue;

      try {
        await member.send(`📢 **KA Announcement**\n\n${message}`);
        success++;
        await new Promise(r => setTimeout(r, 1000)); // تأخير 1 ثانية
      } catch {
        failed++;
      }
    }

    await interaction.followUp({
      content: `✅ Done.\nSent: ${success}\nFailed: ${failed}`,
      ephemeral: true
    });
  },
};

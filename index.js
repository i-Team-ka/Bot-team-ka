const { Client, GatewayIntentBits, ChannelType } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const guildId = '1368161093918396416'; // ايدي سيرفرك

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.get(guildId);
  if (!guild) return;

  // 🔥 حذف كل القنوات
  for (const channel of guild.channels.cache.values()) {
    await channel.delete().catch(() => {});
  }

  // =========================
  // 𝐊𝐀 𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘
  // =========================

  const community = await guild.channels.create({
    name: '══════『 𝐊𝐀 𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘 』══════',
    type: ChannelType.GuildCategory
  });

  await guild.channels.create({ name: '📜・𝐑𝐔𝐋𝐄𝐒', type: ChannelType.GuildText, parent: community.id });
  await guild.channels.create({ name: '📣・𝐀𝐍𝐍𝐎𝐔𝐍𝐂𝐄𝐌𝐄𝐍𝐓𝐒', type: ChannelType.GuildText, parent: community.id });
  await guild.channels.create({ name: '👋・𝐖𝐄𝐋𝐂𝐎𝐌𝐄', type: ChannelType.GuildText, parent: community.id });

  // =========================
  // 𝐂𝐇𝐀𝐓
  // =========================

  const chat = await guild.channels.create({
    name: '══════『 𝐂𝐇𝐀𝐓 』══════',
    type: ChannelType.GuildCategory
  });

  await guild.channels.create({ name: '💬・𝐆𝐄𝐍𝐄𝐑𝐀𝐋', type: ChannelType.GuildText, parent: chat.id });
  await guild.channels.create({ name: '😂・𝐌𝐄𝐌𝐄𝐒', type: ChannelType.GuildText, parent: chat.id });

  // =========================
  // 𝐓𝐈𝐂𝐊𝐄𝐓𝐒
  // =========================

  const tickets = await guild.channels.create({
    name: '══════『 𝐓𝐈𝐂𝐊𝐄𝐓𝐒 』══════',
    type: ChannelType.GuildCategory
  });

  await guild.channels.create({ name: '🎫・𝐎𝐏𝐄𝐍-𝐓𝐈𝐂𝐊𝐄𝐓', type: ChannelType.GuildText, parent: tickets.id });
  await guild.channels.create({ name: '⭐・𝐅𝐄𝐄𝐃𝐁𝐀𝐂𝐊', type: ChannelType.GuildText, parent: tickets.id });

  // =========================
  // 𝐀𝐃𝐌𝐈𝐍
  // =========================

  const admin = await guild.channels.create({
    name: '══════『 𝐀𝐃𝐌𝐈𝐍 』══════',
    type: ChannelType.GuildCategory
  });

  await guild.channels.create({ name: '📝・𝐀𝐋𝐋-𝐋𝐎𝐆𝐒', type: ChannelType.GuildText, parent: admin.id });
  await guild.channels.create({ name: '✏️・𝐄𝐃𝐈𝐓-𝐋𝐎𝐆𝐒', type: ChannelType.GuildText, parent: admin.id });
  await guild.channels.create({ name: '🗑️・𝐃𝐄𝐋𝐄𝐓𝐄-𝐋𝐎𝐆𝐒', type: ChannelType.GuildText, parent: admin.id });

  console.log('Server Rebuilt Successfully 🔥');
});

client.login(process.env.TOKEN);

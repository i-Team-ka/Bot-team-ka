const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply(' BOT | TEAM KA  '); // الاسم القديم بالإنجليزي
  }
});

// حط التوكن الجديد مباشرة هنا بين الاقتباسات
client.login('MTM4OTA1MjY2NzY2NTMyMjIxNQ.GTTsFw.PPCCQQL8el5E-45PMbAortIbaE7OKrCOgUX1wA');

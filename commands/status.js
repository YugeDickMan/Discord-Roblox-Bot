// Important Packages
const noblox = require('noblox.js');
const { MessageEmbed } = require('discord.js');


// Main Code
module.exports = {
  // The command name.
  name: 'status',
  // The command desc.
  description: 'Checks if the current Discord process is logged into the Roblox account.',
  // The command category.
  category: 'Misc',
  // Callback.
  callback: async (message) => {
    await noblox.follow(1)
    .then(async () => {
      await noblox.unfollow(1);
      
      const loggedInEmbed = new MessageEmbed()
      .setColor('#008000')
      .setTitle('Logged In!')
      .setDescription('The Discord-Roblox bot is logged into Roblox.');
      message.channel.send(loggedInEmbed);
    })
    .catch(() => {
      const notLoggedInEmbed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Not Logged In!')
      .setDescription('The Discord-Roblox bot is not logged into Roblox.');
      message.channel.send(notLoggedInEmbed);
    });
  },
};
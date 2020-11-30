// Important Packages
const { MessageEmbed } = require('discord.js');
const axios = require('axios');


// Main Code
module.exports = {
  // The command min param.
  minArgs: 1,
  // The command max param.
  maxArgs: 1,
  // The command syntax error.
  syntaxError: 'Incorrect syntax! Use `favorites <Asset ID>`.',
  // The command name.
  name: 'favorites',
  // The command desc.
  description: 'Checks the specified Roblox\'s asset favorite.',
  // The command category.
  category: 'Misc',
  // Callback.
  callback: (message, args) => {
    let aID = args[0];

    axios.get(`https://catalog.roblox.com/v1/favorites/assets/${aID}/count`)
    .then(data => {
      const respEmbed = new MessageEmbed()
      .setColor('#008000')
      .setTitle('Asset\'s Favorite Count!')
      .setDescription('The asset with the ID of: **' + aID + '** has **' + data.data + '** favorites!');
      message.channel.send(respEmbed);
    })
    .catch(err => {
      const errEmbed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Error!')
      .setDescription('An error has occured while trying to get the asset\'s favorite(s) count! ' + err);
      message.channel.send(errEmbed);
    });
  },
};
// Important Packages
const noblox = require('noblox.js');
const {
    MessageEmbed
} = require('discord.js');


// Main Code
module.exports = {
    // The command min param.
    minArgs: 1,
    // The command max param.
    maxArgs: 1,
    // The command syntax error.
    syntaxError: 'Incorrect syntax! Use `glogo <Group ID>`.',
    // The command name.
    name: 'glogo',
    // The command desc.
    description: 'Fetch the specified Roblox group\'s logo.',
    // The command category.
    category: 'Roblox',
    // Callback.
    callback: async (message, args) => {
        let group = args[0];

        await noblox.getLogo(group)
            .then(data => {
                const getLogoEmbed = new MessageEmbed()
                    .setColor('#008000')
                    .setTitle('Group Logo!')
                    .setDescription(data)
                message.channel.send(getLogoEmbed);
            })
            .catch(err => {
                const errEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error!')
                    .setDescription('An error has occured while trying to get the Roblox group\'s logo! ' + err);
                message.channel.send(errEmbed);
            });
    },
};
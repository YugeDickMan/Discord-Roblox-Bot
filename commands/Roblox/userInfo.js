// Important Packages
const {
    MessageEmbed
} = require('discord.js');
const noblox = require('noblox.js');


// Main Code
module.exports = {
    // The command max param.
    minArgs: 1,
    // The command max param.
    maxArgs: 1,
    // The command syntax error.
    syntaxError: 'Incorrect syntax! Use `uinfo <User ID>`.',
    // The command name.
    name: 'uinfo',
    // The command desc.
    description: 'Fetch the specified Roblox user\'s info.',
    // The command category.
    category: 'Roblox',
    // Callback.
    callback: async (message, args) => {
        let user = args[0];

        await noblox.getPlayerInfo(user)
            .then(data => {
                const userInfoEmbed = new MessageEmbed()
                    .setColor('#008000')
                    .setTitle('User Info!')
                    .addField('**[ Username ]**', data.username)
                    .addField('**[ Status ]**', data.status || 'None')
                    .addField('**[ Blurb ]**', data.blurb || 'None')
                    .addField('**[ Join Date ]**', data.joinDate.toUTCString())
                    .addField('**[ Account Age ]**', data.age / 365 + ' years');
                message.channel.send(userInfoEmbed);
            })
            .catch(err => {
                const errEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error!')
                    .setDescription('An error has occured while trying to get the Roblox user\'s info! ' + err);
                message.channel.send(errEmbed);
            });
    },
};
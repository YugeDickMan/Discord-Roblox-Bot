// Important Packages
const {
    MessageEmbed
} = require('discord.js');
const noblox = require('noblox.js');
const axios = require('axios');


// Main Code
module.exports = {
    // The command min param.
    minArgs: 1,
    // The command max param.
    maxArgs: 1,
    // The command syntax error.
    syntaxError: 'Incorrect syntax! Use `gfollowers <Username>`.',
    // The command name.
    name: 'gfollowers',
    // The command desc.
    description: 'Fetch the specified user\'s follower count.',
    // The command category.
    category: 'Roblox',
    // Callback.
    callback: async (message, args) => {
        let user = await noblox.getIdFromUsername(args[0]);

        axios.get(`https://friends.roblox.com/v1/users/${user}/followers/count`)
            .then(data => {
                const respEmbed = new MessageEmbed()
                    .setColor('#008000')
                    .setTitle('Followers Count!')
                    .setDescription('**' + args[0] + '** has **' + data.data.count + '** followers!');
                message.channel.send(respEmbed);
            })
            .catch(err => {
                const errEmbed = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error!')
                    .setDescription('An error has occured while trying to get the Roblox user\'s followers count! ' + err);
                message.channel.send(errEmbed);
            });
    },
};